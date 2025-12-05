from fastapi import APIRouter
from pydantic import BaseModel

from core.chain import get_chain
from core.retriever import get_reranked_docs
from utils.history import get_history, add_to_history

router = APIRouter(prefix="/ask", tags=["ask"])

class Query(BaseModel):
    session_id: int
    question: str


def build_context(question: str):
    
    # 1. Retrieve + rerank
    docs = get_reranked_docs(question)

    # 2. Build citation-aware context for the LLM
    #    Format: [source: filename.pdf, page X] content...
    context_chunks = []
    sources = []  # for the API response

    for d in docs:
        file = d.metadata.get("file") or d.metadata.get("source")
        page = d.metadata.get("page")
        
        citation_tag = f"[Source: {file}, page {page}]"
        context_chunks.append(f"{citation_tag}\n{d.page_content}")

        sources.append({
            "file": file,
            "page": page
        })
    
    return "\n\n---\n\n".join(context_chunks), sources


@router.post("/")
async def ask(q: Query):
    chain = get_chain()

    history = get_history(q.session_id)
    context, sources = build_context(q.question)

    # Run LCEL RAG chain
    answer = chain.invoke({
        "history": history,
        "question": q.question,
        "context": context
    })

    # Update session memory
    add_to_history(q.session_id, q.question, answer)

    return {
        "question": q.question,
        "answer": answer,
        "context_used": context,
        "citations": sources
    }
