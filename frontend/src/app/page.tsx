import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-10 rounded-xl shadow-lg bg-white dark:bg-zinc-900 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          PDF RAG Assistant
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-center">
          Upload a PDF and chat with your document using FastAPI + LangChain + Next.js.
        </p>

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

        <footer className="text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Built with Next.js + FastAPI + LangChain
        </footer>
      </main>
    </div>
  );
}
