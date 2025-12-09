"use client";

import Link from 'next/link'
import { useState } from "react";
import { askQuestion } from "@/lib/api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [sessionId] = useState(1);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const question = input;
    setInput("");
    setLoading(true);

    try {
      const res = await askQuestion(sessionId, question);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: res.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </Link>
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="border rounded p-4 h-[500px] overflow-y-auto bg-white shadow">
        {messages.map((m, i) => (
          <div key={i} className="mb-3">
            <b>{m.role === "user" ? "You" : "AI"}:</b>
            <p>{m.content}</p>
          </div>
        ))}

        {loading && <p className="italic text-gray-500">AI is thinking...</p>}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="border p-2 flex-1 rounded"
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
