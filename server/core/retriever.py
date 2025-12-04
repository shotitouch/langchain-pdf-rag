from langchain_community.vectorstores import Chroma
from core.embeddings import embeddings
from config import PERSIST_DIR

vectorstore = Chroma(
    persist_directory=PERSIST_DIR,
    embedding_function=embeddings
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
