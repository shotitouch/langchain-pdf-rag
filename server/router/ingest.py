# routers/ingest.py
from fastapi import APIRouter, UploadFile
from tempfile import NamedTemporaryFile
from langchain_community.document_loaders import PyPDFLoader

from core.retriever import vectorstore   # global Chroma instance
from utils.text_splitter import split_text

router = APIRouter(prefix="/ingest")


@router.post("/")
async def ingest_pdf(file: UploadFile):
    """
    Upload a PDF → Extract text → Chunk → Store in Chroma
    with metadata (filename, page number)
    """

    # 1. Save uploaded PDF temporarily
    with NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # 2. Load PDF pages
    loader = PyPDFLoader(tmp_path)
    pages = loader.load()

    texts = []
    metadatas = []

    # 3. Convert each page → chunks → store metadata
    for page_num, page in enumerate(pages):
        chunks = split_text(page.page_content)

        for chunk in chunks:
            texts.append(chunk)
            metadatas.append({
                "source": file.filename,
                "page": page_num + 1
            })

    # 4. Add chunks + metadata to vectorstore
    vectorstore.add_texts(
        texts=texts,
        metadatas=metadatas
    )

    # 5. Persist to disk
    vectorstore.persist()

    # 6. Return summary
    return {
        "message": f"{file.filename} ingested successfully",
        "pages": len(pages),
        "chunks_added": len(texts),
    }
