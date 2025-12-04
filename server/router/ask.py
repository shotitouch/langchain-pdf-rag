from fastapi import APIRouter
from pydantic import BaseModel

from core.chain import get_chain
from core.retriever import retriever
from utils.history import get_history, add_to_history

router = APIRouter(prefix="/ask", tags=["ask"])

class Query(BaseModel):
    session_id: int
    question: str


def build_context(question: str):
    docs = retriever.invoke(question)
    return "\n\n---\n\n".join(d.page_content for d in docs)


@router.post("/")
async def ask(q: Query):
    chain = get_chain()

    history = get_history(q.session_id)
    context = build_context(q.question)

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
    }
