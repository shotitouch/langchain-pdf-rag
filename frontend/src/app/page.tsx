import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <main className="flex flex-col items-center gap-8 p-10 rounded-xl shadow-lg bg-white dark:bg-zinc-900 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          PDF RAG Assistant
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-center">
          Upload a PDF and chat with your document using FastAPI, LangChain, and Next.js.
          This project demonstrates a full-stack Retrieval-Augmented Generation (RAG) pipeline.
        </p>

        {/* Purpose Section */}
        <section className="w-full bg-zinc-100 dark:bg-zinc-800 p-5 rounded-lg">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Purpose of This Website
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            This project showcases my ability to build production-ready AI applications that
            integrate:
            <br />• Document ingestion and text chunking  
            <br />• Chroma vector database for semantic retrieval  
            <br />• RAG pipeline built with LangChain  
            <br />• FastAPI backend + Next.js frontend  
            <br />
            It serves as a portfolio project to demonstrate my skills for AI/ML and software engineering internship roles.
          </p>
        </section>

        {/* Live Demo Notice */}
        <section className="w-full border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20 p-4 rounded-lg text-sm text-amber-900 dark:text-amber-200">
          <p className="font-semibold mb-1">
            ⚠️ Live demo notice (Free-tier hosting)
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The backend may take <strong>30–90 seconds</strong> to respond after inactivity
              (<strong>cold start</strong>).
            </li>
            <li>
              Uploaded documents are stored <strong>temporarily</strong> and may reset after inactivity.
            </li>
          </ul>
          <p className="mt-2 text-amber-800 dark:text-amber-300">
            This behavior is expected on free-tier infrastructure. Production deployment would use
            always-on services and persistent storage.
          </p>
        </section>

        {/* About Me Section */}
        <section className="w-full bg-zinc-100 dark:bg-zinc-800 p-5 rounded-lg">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            About Me
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            I'm <strong>Shotitouch Tuangcharoentip</strong>, a Machine Learning graduate student at 
            Stevens Institute of Technology. I focus on building real-world AI systems, including 
            full-stack RAG applications, adversarial machine learning, and NLP models.
            <br /><br />
            I created this project to strengthen my portfolio and showcase my ability to design, 
            implement, and deploy scalable GenAI applications end-to-end.
          </p>
        </section>

        <div className="flex flex-col gap-4 w-full">
          <Link
            href="/upload"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Upload PDF
          </Link>

          <Link
            href="/chat"
            className="w-full text-center border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 py-3 rounded-lg transition"
          >
            Chat with Document
          </Link>
        </div>

        <footer className="text-sm text-zinc-500 dark:text-zinc-400 mt-6 text-center">
          Built with Next.js • FastAPI • LangChain • ChromaDB
        </footer>
      </main>
    </div>
  );
}
