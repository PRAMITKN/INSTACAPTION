import { useState } from "react";
import { generateCaption } from "../utils/ollamaClient";

export default function CaptionGenerator() {
  const [input, setInput] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    try {
      const { caption, hashtags } = await generateCaption(input);
      setCaption(caption);
      setHashtags(hashtags);
    } catch (err) {
      setError("Failed to generate caption. Please try again.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${caption}\n\n${hashtags}`);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          📸 InstaCaption AI
        </h1>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your post topic..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {caption && (
          <div className="mt-6 space-y-3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold text-indigo-800 mb-2">Caption:</h2>
              <p className="text-gray-800 break-words">{caption}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold text-pink-800 mb-2">Hashtags:</h2>
              <p className="text-gray-800 break-words">{hashtags}</p>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full py-2 mt-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
