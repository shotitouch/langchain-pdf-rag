from fastapi import FastAPI
from router.ask import router as ask_router
from router.health import router as health_router
from router.ingest import router as ingest_router

app = FastAPI(title="RAG API (LCEL)", version="1.0.0")

app.include_router(ask_router)
app.include_router(health_router)
app.include_router(ingest_router)

@app.get("/")
def home():
    return {"message": "RAG API running"}
