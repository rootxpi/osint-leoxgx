"use client";
import { useState } from 'react';

export default function Home() {
  const [activeTool, setActiveTool] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const tools = [
    { id: "number", icon: "📱", label: "Number to Info", desc: "Phone intelligence", placeholder: "e.g. 9999999991" },
    { id: "aadhaar", icon: "🪪", label: "Aadhaar to Info", desc: "Identity lookup", placeholder: "Enter 12 digit ID" },
    { id: "vehicle", icon: "🚗", label: "Vehicle Info", desc: "RC intelligence", placeholder: "e.g. RJ18CF3690" },
    { id: "ip", icon: "🌐", label: "IP to Info", desc: "Network intel", placeholder: "e.g. 8.8.8.8" },
    { id: "gmail", icon: "✉️", label: "Gmail Info", desc: "Email lookup", placeholder: "name@gmail.com" }
  ];

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: activeTool.id, query: query.trim() })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Connection Failed." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white p-6 font-sans">
      <header className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
          🛡️
        </div>
        <div>
          <h1 className="font-extrabold text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            𝖫Ξ𝖮⟁𝗘𝗬Ξ
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Advanced Osint Hub</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-12 text-center">
        {!activeTool ? (
          <>
            <h2 className="text-3xl font-bold mb-8">Select Intelligence Tool</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              {tools.map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => setActiveTool(t)}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all shadow-lg text-left"
                >
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <h3 className="font-bold">{t.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-xl mx-auto mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl shadow-2xl">
            <button onClick={() => {setActiveTool(null); setResult(null); setQuery("");}} className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-2">
              ← Back to Tools
            </button>
            <div className="text-4xl mb-4">{activeTool.icon}</div>
            <h2 className="text-2xl font-bold mb-6">{activeTool.label}</h2>
            <input 
              type="text" 
              placeholder={activeTool.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 bg-[#0a0a0a] border border-gray-700 rounded-xl mb-4 focus:outline-none focus:border-purple-500 text-white"
            />
            <button 
              onClick={handleSearch}
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold tracking-widest hover:opacity-90 transition-opacity"
            >
              {loading ? "SCANNING..." : "EXECUTE"}
            </button>

            {result && (
              <div className="mt-8 text-left bg-black/50 p-4 rounded-xl border border-gray-800 overflow-x-auto">
                <pre className="text-xs text-green-400 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

