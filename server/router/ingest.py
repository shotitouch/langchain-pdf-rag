from fastapi import APIRouter, UploadFile, File
from langchain_community.document_loaders import PyPDFLoader
from utils.text_splitter import split_text
from utils.file import save_temp_pdf, delete_temp_file
from core.embeddings import embeddings
from config import PERSIST_DIR
from langchain_community.vectorstores import Chroma

router = APIRouter(prefix="/ingest", tags=["ingest"])

@router.post("/")
async def ingest_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files supported."}

    pdf_bytes = await file.read()
    temp_path = save_temp_pdf(pdf_bytes)

    loader = PyPDFLoader(temp_path)
    docs = loader.load()

    chunks = split_text(docs)

    vectorstore = Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=embeddings
    )

    vectorstore.add_documents(chunks)
    vectorstore.persist()

    delete_temp_file(temp_path)

    return {
        "message": "PDF ingested successfully",
        "pages": len(docs),
        "chunks_added": len(chunks)
    }
