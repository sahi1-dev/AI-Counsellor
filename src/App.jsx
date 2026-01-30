import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Onboarding from "./Onboarding";

function App() {
  // 🔐 ONBOARDING GATE
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("onboarded") === "true"
  );

  const [stage, setStage] = useState(
    () => parseInt(localStorage.getItem("stage")) || 1
  );

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🚪 ONBOARDING BLOCK
  if (!onboarded) {
    return (
      <Onboarding
        onComplete={() => {
          localStorage.setItem("onboarded", "true");
          localStorage.setItem("stage", "1");
          setOnboarded(true);
          setStage(1);
        }}
      />
    );
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let extraContext = "";

    // 🎓 STAGE 2: FIXED UNIVERSITY LIST
    if (stage === 2) {
      extraContext = `
Use ONLY these universities:

Dream:
- Stanford
- MIT

Target:
- NYU
- USC

Safe:
- ASU
- UT Dallas

End your response with [READY_TO_LOCK]
`;
    }

    // 🔒 STAGE 3: LOCK UNIVERSITY
    if (stage === 3) {
      extraContext = `
If the user selects a university, confirm it is locked.
End your response with [LOCK_DONE]
`;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/counsel", {
        problem: `
You are an AI counsellor.

Current Stage: ${stage}

Rules:
Stage 1: Ask questions to build profile. When profile feels complete, reply with [STAGE_COMPLETE]
Stage 2: Show university shortlist only
Stage 3: Lock ONE university
Stage 4: Give application checklist

${extraContext}

User message:
${userMsg.text}
        `,
      });

      const aiReply = res.data.reply;

      // 🔄 AUTO STAGE TRANSITIONS
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: aiReply.replace(/\[.*?\]/g, "") },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center">

      {/* SAME ANIMATED BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#1e3a8a,transparent_40%),radial-gradient(circle_at_80%_30%,#7c3aed,transparent_40%),radial-gradient(circle_at_50%_80%,#0ea5e9,transparent_40%)] animate-bg-move" />

      {/* SAME GRADIENT BORDER */}
      <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-border">

        {/* MAIN CONTAINER */}
        <div className="w-full max-w-6xl h-[85vh] rounded-3xl bg-[#0b0f19] shadow-2xl grid grid-cols-12 overflow-hidden">

          {/* LEFT PANEL */}
          <div className="col-span-4 bg-[#0f1522] border-r border-white/10 p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-2">
              AI COUNSELLOR
            </h1>

            <p className="text-gray-400 text-sm mb-6">
              Guided study-abroad decision system
            </p>

            <div className="text-sm text-gray-300 mb-6">
            <div className="mb-1">Current Stage</div>

            <div className="font-medium text-white">
              {stage === 1 && "Building Profile"}
              {stage === 2 && "Discovering Universities"}
              {stage === 3 && "Finalizing University"}
              {stage === 4 && "Preparing Applications"}
            </div>

            {/* 👇 THIS LINE ADDS CLARITY */}
            <div className="text-xs text-gray-400 mt-2">
              {stage === 1 && "Answer a few questions to build your profile"}
              {stage === 2 && "Review the recommended universities"}
              {stage === 3 && "Select and lock one university"}
              {stage === 4 && "Follow the application checklist"}
            </div>
          </div>


            {/* DEMO SAFETY BUTTON */}
            <button
              onClick={() => {
                const next = Math.min(stage + 1, 4);
                setStage(next);
                localStorage.setItem("stage", next.toString());
              }}
              className="mb-6 bg-gray-700 hover:bg-gray-600 text-sm py-2 rounded"
            >
              Go to Next Stage (Demo Backup)
            </button>

            <div className="mt-auto text-xs text-gray-500">
              Humanity Founders Hackathon
            </div>
          </div>

          {/* RIGHT CHAT PANEL */}
          <div className="col-span-8 flex flex-col bg-[#090c14]">

            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                AI Counsellor Session
              </h2>
              <p className="text-sm text-gray-400">
                Share what you are going through
              </p>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {stage === 4 && (
            <div className="bg-white/10 text-gray-100 p-4 rounded-xl max-w-[80%] mx-auto">
              <h3 className="font-semibold mb-2">📋 Application Checklist</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Prepare Statement of Purpose (SOP)</li>
                <li>Shortlist and contact recommenders (LORs)</li>
                <li>Prepare for IELTS / GRE</li>
                <li>Collect academic transcripts</li>
                <li>Submit university applications</li>
              </ul>
            </div>
          )}

              {messages.length === 0 && stage !== 4 && (
              <div className="text-gray-500 text-center mt-24 italic">
                Describe your situation to begin...
              </div>
            )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] px-4 py-3 rounded-xl text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-white/10 text-gray-100 mr-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className="text-gray-400 animate-pulse">
                  AI is thinking...
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-white/10 flex gap-4 bg-[#0b0f19]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-black/40 text-white rounded-xl px-4 py-3 outline-none placeholder-gray-500"
                placeholder="Type your message..."
              />

              <button
                onClick={sendMessage}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* SAME ANIMATIONS */}
      <style>
        {`
          @keyframes bgMove {
            0% { background-position: 0% 0%, 100% 0%, 50% 100%; }
            50% { background-position: 100% 50%, 0% 100%, 50% 0%; }
            100% { background-position: 0% 0%, 100% 0%, 50% 100%; }
          }
          .animate-bg-move {
            animation: bgMove 12s ease-in-out infinite;
          }

          @keyframes borderMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-border {
            background-size: 200% 200%;
            animation: borderMove 6s linear infinite;
          }
        `}
      </style>

    </div>
  );
}

export default App;
