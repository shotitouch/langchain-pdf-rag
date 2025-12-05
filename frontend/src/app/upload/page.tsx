"use client";

import { useState } from "react";
import { ingestPDF } from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) return;

    setMessage("Uploading...");

    try {
      const res = await ingestPDF(file);
      setMessage(JSON.stringify(res, null, 2));
    } catch (err) {
      setMessage("Upload failed");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        className="border p-2 mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {message && (
        <pre className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap">
          {message}
        </pre>
      )}
    </div>
  );
}
