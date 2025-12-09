# 📄 RAG PDF Chatbot — LangChain + FastAPI + Next.js

A full-stack **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDFs and ask questions grounded strictly in the document’s content.  
Built with **LangChain**, **FastAPI**, **OpenRouter**, **ChromaDB**, and a modern **Next.js** frontend.

This project demonstrates end-to-end GenAI engineering: ingestion, chunking, embedding, vector retrieval, LLM orchestration, and UI integration.

---

## 📌 Deployment Status

This project currently runs **locally only**.  
There is **no hosted instance yet**.

Users must:

1. Run the FastAPI backend locally  
2. Run the Next.js frontend locally  
3. Upload their own PDF files to use the chatbot  

A future deployment on **Vercel (frontend)** + **Render (backend)** is planned.  
The README will be updated once hosting is available.

---

## 🚀 Features

- PDF ingestion → extraction → recursive chunking → embeddings  
- RAG architecture with ChromaDB + OpenAI embeddings  
- FastAPI backend with modular routes and conversation memory  
- Next.js frontend with chat UI, file upload, and streaming responses  
- Strict context-only answering (hallucination mitigation)  
- Clean, production-ready code structure  

---

## 🧱 Tech Stack

### Backend
- FastAPI  
- LangChain  
- OpenRouter API  
- ChromaDB  
- Python 3.10+  

### Frontend
- Next.js (React + TypeScript)  
- TailwindCSS  
- Axios  

---

## 🏗️ Architecture Overview

```
            ┌──────────────┐
            │  Next.js UI  │
            │ (Chat + PDF  │
            │   Upload)    │
            └───────┬──────┘
                    │
                    ▼
              ┌──────────┐
              │ FastAPI   │
              │  Backend  │
              └─────┬────┘
        Ingest PDF   │   Chat Query
                    ▼
       ┌──────────────────────┐
       │ LangChain Pipeline   │
       │ - Text Splitter      │
       │ - Embeddings         │
       │ - Chroma Retrieval   │
       │ - ChatOpenAI         │
       └─────────┬───────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   ChromaDB      │
        │ Vector Store    │
        └─────────────────┘
```

---

## 📥 Backend Setup (FastAPI)

### 1. Create virtual environment
```bash
python -m venv .venv
source .venv/bin/activate      # Mac/Linux
.venv\Scripts\activate         # Windows
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment variables
Create `.env`:

```
OPENROUTER_API_KEY=your_key_here
```

### 4. Start backend
```bash
uvicorn app.main:app --reload
```

Runs at: **http://localhost:8000**

---

## 📤 API Endpoints

### POST /ingest — Upload & store PDF
```bash
curl -X POST -F "file=@example.pdf" http://localhost:8000/ingest
```

Response:
```json
{
  "message": "File ingested successfully",
  "chunks": 128
}
```

---

### POST /chat — Ask questions about ingested PDF
Request:
```json
{
  "question": "What is the main purpose of this document?"
}
```

Response:
```json
{
  "answer": "The document discusses ..."
}
```

---

## 💻 Frontend Setup (Next.js)

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables  
Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start development server
```bash
npm run dev
```

Runs at: **http://localhost:3000**

---

## 🗂️ Project Structure

```
.
├── server/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── ingest.py
│   │   │   └── chat.py
│   │   ├── retriever/
│   │   ├── utils/
│   │   └── models/
│   └── chroma/
│
└── client/
    ├── pages/
    ├── components/
    ├── styles/
    └── utils/
```

---

## 🧠 How RAG Works

1. User uploads a PDF  
2. Text extracted using PyPDFLoader  
3. Split into chunks with `RecursiveCharacterTextSplitter`  
4. Embeddings generated via OpenAI / OpenRouter  
5. Stored in ChromaDB for retrieval  
6. Retriever selects relevant chunks per question  
7. ChatOpenAI generates an answer using **context only**  
8. Frontend streams answer to UI  

---

## 🔒 Hallucination Control

```
Use ONLY the provided context.
If the answer is not found, reply:
"Not found in context."
```

---

## 🧪 Testing Tips

Try:

- “Summarize this PDF.”  
- “What does section 3 say?”  
- “List all dates mentioned.”  
- “What is the main argument?”  

---

## 🚀 Deployment (Future Plan)

- Frontend → **Vercel**  
- Backend → **Render / Railway / AWS EC2**  
- Persistent Chroma storage  
- Production CORS configuration  

---

## 📜 License
MIT License

---

## ⭐ Acknowledgements
Powered by: LangChain, FastAPI, OpenRouter, ChromaDB, Next.js  
