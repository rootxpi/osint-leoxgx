"use client";
import { useState } from 'react';

export default function Home() {
  const [activeTool, setActiveTool] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tools = [
    { id: "number", icon: "📱", label: "Number to Info", desc: "Basic phone intelligence", placeholder: "e.g., 9999999991 (10 digits only, NO +91 or spaces)" },
    { id: "number-advance", icon: "📲", label: "Number to Advance info", desc: "Deep phone intelligence", placeholder: "e.g., 9999999991 (10 digits only, NO +91 or spaces)" },
    { id: "number-ultimate", icon: "🔥", label: "Phone number to ultimate info", desc: "Ultimate phone intelligence", placeholder: "e.g., 9999999991 (10 digits only)" },
    
    { id: "aadhaar", icon: "🪪", label: "Aadhaar to Info", desc: "Aadhaar identity lookup", placeholder: "Enter 12 digits exactly (NO spaces)" },
    { id: "vehicle", icon: "🚗", label: "Vehicle to Info", desc: "Basic RC lookup", placeholder: "e.g., RJ18CF3690 (NO spaces or hyphens)" },
    { id: "vehicle-advance", icon: "🛻", label: "Vehicle Advance Info", desc: "Deep RC intelligence", placeholder: "e.g., RJ18CF3690 (NO spaces or hyphens)" },
    { id: "tg", icon: "✈️", label: "TG to Num", desc: "Telegram ID lookup", placeholder: "e.g., 123456789 (Numeric ID only)" },
    { id: "ip", icon: "🌐", label: "IP to Info", desc: "Geo & network intel", placeholder: "e.g., 8.8.8.8" },
    { id: "gmail", icon: "✉️", label: "Gmail to Info", desc: "Email account lookup", placeholder: "name@gmail.com" }
  ];

  // ADVANCED CLEANUP: Removes old traces completely instead of messy replacements
  const cleanData = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(cleanData);

    const newObj = { ...obj };
    for (let key in newObj) {
      const lowerKey = key.toLowerCase();
      // Remove any original developer or telegram keys entirely
      if (['developer', 'dev', 'tag', 'channel', 'telegram', 'owner'].includes(lowerKey)) {
        delete newObj[key];
        continue;
      }
      
      if (typeof newObj[key] === 'string') {
        const lowerVal = newObj[key].toLowerCase();
        // Remove nested string values that contain old names
        if (lowerVal.includes('noob') || lowerVal.includes('sahilxalone') || lowerVal.includes('t.me/')) {
          delete newObj[key];
        }
      } else if (typeof newObj[key] === 'object') {
        newObj[key] = cleanData(newObj[key]);
      }
    }
    return newObj;
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: activeTool.id, query: query.trim() })
      });
      const rawData = await res.json();
      
      // Step 1: Deep scrub of all original credits to make output clean
      const cleanedData = cleanData(rawData);
      
      // Step 2: Append your credit exactly ONCE at the very end of the root object
      let finalData;
      if (Array.isArray(cleanedData)) {
        finalData = {
          results: cleanedData,
          developer: "@Ph4ntomXeye",
          channel: "https://t.me/GhostxProtoc0l"
        };
      } else if (typeof cleanedData === 'object' && cleanedData !== null) {
        finalData = {
          ...cleanedData,
          developer: "@Ph4ntomXeye",
          channel: "https://t.me/GhostxProtoc0l"
        };
      } else {
        finalData = cleanedData;
      }

      setResult(finalData);
    } catch (e) {
      setResult({ error: "Connection Failed. Please try again." });
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(139,92,246,0.15),transparent_60%),radial-gradient(ellipse_50%_45%_at_85%_15%,rgba(217,70,239,0.15),transparent_60%)] pointer-events-none"></div>
      
      <div className="relative z-10 p-4 sm:p-6">
        <header className="max-w-5xl mx-auto sticky top-4 z-20">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20 border border-white/10">
              🛡️
            </div>
            <div className="leading-tight">
              <h1 className="font-extrabold text-xl tracking-wide">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">𝖫Ξ𝖮⟁𝗘𝗬Ξ</span>
              </h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                ADVANCE OSINT TOOLS by <a href="https://t.me/Ph4ntomXeye" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline transition-colors">@Ph4ntomXeye</a>
              </p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[11px] text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              All systems online
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto mt-16 text-center pb-20">
          {!activeTool ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[11px] text-gray-400 mb-8 shadow-sm">
                <span className="text-purple-400">🔍</span> 9 OSINT tools in free 
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold mb-12 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-fuchsia-300">Open-source</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-300 via-purple-400 to-cyan-300">intelligence, beautifully.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
                {tools.map((t) => (
                  <button 
                    key={t.id} 
                    onClick={() => setActiveTool(t)}
                    className="group p-6 rounded-3xl bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-white/[0.08] hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] transition-all duration-300 text-left"
                  >
                    <div className="flex justify-between items-start mb-5">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                        {t.icon}
                      </div>
                      <div className="text-gray-500 group-hover:text-purple-400 transition-colors">↗</div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-100">{t.label}</h3>
                    <p className="text-[10px] text-fuchsia-400/80 font-medium uppercase tracking-[0.15em] mt-1 mb-3">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto mt-4 p-6 sm:p-8 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300">
              <button onClick={() => {setActiveTool(null); setResult(null); setQuery("");}} className="text-xs text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-colors">
                ← Back to Tools
              </button>
              <div className="text-5xl mb-6 flex justify-center">
                <div className="bg-white/5 p-4 rounded-3xl border border-white/10 shadow-inner">{activeTool.icon}</div>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-100">{activeTool.label}</h2>
              <p className="text-fuchsia-400/80 text-[10px] font-medium uppercase tracking-[0.15em] mb-8">{activeTool.desc}</p>
              
              <input 
                type="text" 
                placeholder={activeTool.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-4 bg-black/40 border border-white/10 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-600 transition-all shadow-inner"
              />
              <button 
                onClick={handleSearch}
                className="w-full p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-2xl font-bold tracking-widest text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-[0.98]"
              >
                {loading ? "SEARCHING..." : "SEARCH"}
              </button>

              {result && (
                <div className="relative mt-8 text-left bg-[#0a0a0a]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-inner group">
                  <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Intelligence Result</span>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors text-gray-300"
                    >
                      {copied ? "✓ Copied" : "📋 Copy"}
                    </button>
                  </div>
                  <pre className="text-[11px] sm:text-xs text-emerald-400 whitespace-pre-wrap font-mono overflow-x-auto leading-relaxed">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
    }
                      
