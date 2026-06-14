"use client";

import { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/* Types & Data                                                       */
/* ------------------------------------------------------------------ */

type BuriedDraft = {
  id: number;
  text: string;
  to: string;
};

const DELUSION_RESPONSES = [
  "Bestie, his thumb just slipped while eating chips. Let it go. (｡•́︿•̀｡)",
  "He has active screen time, not active feelings. Save your energy! ⊹˚｡",
  "If he wanted to, he would. Instead, he is playing Xbox with the boys. (｀• ω •´)",
  "Analyzing this is like trying to fix a production bug on a server that doesn't exist. Let it rest.",
  "Delusion level detected: Critical. Sending you a gentle mental reset spray 🫧",
  "He viewed your story because he was tapping through everything at lightning speed. It's not a sign! (◕‿◕)",
  "What would you tell your absolute best friend if she said this to you? Now repeat that to yourself.",
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  /* ---------------- State Management ---------------- */
  // Fact-Checker
  const [userThought, setUserThought] = useState("");
  const [activeThought, setActiveThought] = useState("");
  const [realityCheck, setRealityCheck] = useState("");

  // Drafts Cemetery
  const [recipient, setRecipient] = useState("");
  const [urgeText, setUrgeText] = useState("");
  const [buriedDrafts, setBuriedDrafts] = useState<BuriedDraft[]>([]);
  const [justBuried, setJustBuried] = useState(false);
  
  // Track which tombstones have been unblurred via "Peek"
  const [revealedDrafts, setRevealedDrafts] = useState<Record<number, boolean>>({});

  // Interaction counts for the recovery score
  const [checkerCount, setCheckerCount] = useState(0);

  /* ---------------- Local Storage Initialization ---------------- */
  useEffect(() => {
    setMounted(true);
    
    // Safely pull previously saved data on startup
    const savedDrafts = localStorage.getItem("crush_cleanse_drafts");
    if (savedDrafts) {
      try {
        setBuriedDrafts(JSON.parse(savedDrafts));
      } catch (e) {
        console.error("Error loading drafts", e);
      }
    }

    const savedCount = localStorage.getItem("crush_cleanse_count");
    if (savedCount) {
      setCheckerCount(Number(savedCount));
    }
  }, []);

  if (!mounted) return null;

  /* ---------------- Core Handlers ---------------- */
  const runFactChecker = () => {
    if (!userThought.trim()) return;
    setActiveThought(userThought.trim());
    
    const randomReply = DELUSION_RESPONSES[Math.floor(Math.random() * DELUSION_RESPONSES.length)];
    setRealityCheck(randomReply);
    setUserThought("");
    
    const nextCount = checkerCount + 1;
    setCheckerCount(nextCount);
    localStorage.setItem("crush_cleanse_count", String(nextCount));
  };

  const buryTheDraft = () => {
    if (!urgeText.trim()) return;
    
    const newDraft: BuriedDraft = {
      id: Date.now(),
      text: urgeText.trim(),
      to: recipient.trim() || "them",
    };

    const updatedList = [newDraft, ...buriedDrafts];
    setBuriedDrafts(updatedList);
    
    // Save directly to Local Storage
    localStorage.setItem("crush_cleanse_drafts", JSON.stringify(updatedList));

    setUrgeText("");
    setJustBuried(true);
    setTimeout(() => setJustBuried(false), 3000);
  };

  const togglePeek = (id: number) => {
    setRevealedDrafts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const recoveryScore = Math.min(100, buriedDrafts.length * 15 + checkerCount * 8);

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 py-8 sm:px-8 lg:px-12">
      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* ============================= HEADER SECTION ============================= */}
        <header className="mb-10 flex flex-col items-center text-center">
          
          {/* Pixel Art Dream Space Container */}
          <div className="mb-6 h-48 w-full max-w-xl overflow-hidden rounded-[1.75rem] border-4 border-[#ffd9ec] bg-[#fff6ee] shadow-md sm:h-56">
            <img 
              src="/pinksky.jpg" 
              alt="Pixel Sky Dreamscape" 
              className="h-full w-full object-cover rendering-pixelated"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#d6588f] sm:text-3xl">(✿◡‿◡)</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#d6588f] sm:text-5xl">
              Crush Cleanse
            </h1>
            <span className="text-2xl text-[#d6588f] sm:text-3xl">(✿◡‿◡)</span>
          </div>
          
          <p className="mt-2 max-w-xl text-base font-medium text-[#9b7e94]">
            A soft, cozy sanctuary for overanalyzing minds. Wreck your delusions, 
            bury your un-sent drafts, and protect your peace. (｀• ω •´)
          </p>

          {/* Heart Recovery Meter */}
          <div className="mt-6 w-full max-w-md rounded-[1.75rem] border border-[#ffd9ec] bg-[#fffdfc]/80 px-6 py-4 shadow-sm backdrop-blur-sm">
            <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-[#d6588f]">
              <span>heart recovery meter</span>
              <span>{recoveryScore}%</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-[#ffd9ec]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f7a8c4] to-[#d6588f] transition-all duration-700 ease-out"
                style={{ width: `${recoveryScore}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs font-semibold text-[#9b7e94]">
              every reality check accepted & every buried draft nudges your heart back to health ⊹
            </p>
          </div>
        </header>

        {/* ============================= MAIN SECTIONS GRID ============================= */}
        <main className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* PANEL 1: Delusion Fact-Checker */}
          <section className="flex h-[36rem] flex-col rounded-[1.75rem] border border-[#ffd9ec] bg-[#fffdfc]/90 p-6 shadow-md backdrop-blur-sm sm:h-[40rem]">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#d6588f]">
                Delusion Fact-Checker 🔮
              </h2>
              <span className="rounded-full bg-[#e6d6f2] px-3 py-1 text-xs font-bold text-[#d6588f]">
                anti-overthinking
              </span>
            </div>
            <p className="mb-4 text-sm font-medium text-[#9b7e94]">
              Type out the thought or signal you keep overanalyzing. Let's look at the facts. (￣ω￣)
            </p>

            {/* Display / Workspace Area */}
            <div className="mb-4 flex flex-1 flex-col justify-center rounded-[1.75rem] bg-[#fff6ee]/70 p-5 text-center border border-[#ffd9ec]/40 overflow-y-auto">
              {activeThought ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#fffdfc] p-4 border border-[#ffd9ec] shadow-sm text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9b7e94]">Your thought:</p>
                    <p className="mt-1 font-medium text-[#5b4452]">"{activeThought}"</p>
                  </div>
                  <div className="rounded-2xl bg-[#e6d6f2]/40 p-4 border border-[#e6d6f2] text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#d6588f]">Reality Check:</p>
                    <p className="mt-1 font-semibold text-[#d6588f] text-sm leading-relaxed">{realityCheck}</p>
                  </div>
                </div>
              ) : (
                <div className="text-[#9b7e94] space-y-2">
                  <p className="text-3xl">(´• ω •̀ )</p>
                  <p className="text-sm font-medium max-w-xs mx-auto">
                    Nothing checked yet. Paste that 'he looked in my general direction' scenario here.
                  </p>
                </div>
              )}
            </div>

            {/* Input Station */}
            <div className="space-y-2">
              <textarea
                value={userThought}
                onChange={(e) => setUserThought(e.target.value)}
                placeholder="e.g., He liked my post from 3 weeks ago at 2 AM, what does it mean??"
                rows={2}
                className="w-full resize-none rounded-2xl border border-[#ffd9ec] bg-[#fffdfc] px-4 py-3 text-sm font-medium text-[#5b4452] outline-none placeholder:text-[#9b7e94]/60 focus:border-[#f7a8c4]"
              />
              <button
                onClick={runFactChecker}
                className="w-full rounded-full bg-[#d6588f] py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Consult the Oracle 🔮
              </button>
            </div>
          </section>

          {/* PANEL 2: The Drafts Cemetery */}
          <section className="flex h-[36rem] flex-col rounded-[1.75rem] border border-[#ffd9ec] bg-[#fffdfc]/90 p-6 shadow-md backdrop-blur-sm sm:h-[40rem]">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#d6588f]">
                The Drafts Cemetery 🪦
              </h2>
              <span className="rounded-full bg-[#ffd9ec] px-3 py-1 text-xs font-bold text-[#d6588f]">
                saved by your future self
              </span>
            </div>
            <p className="mb-4 text-sm font-medium text-[#9b7e94]">
              Draft the text you are desperately itching to send. Lay it cleanly to rest right here. (｡•́︿•̀｡)
            </p>

            {/* Layout Wrapper splitting form and scrollable archive list */}
            <div className="flex flex-1 flex-col overflow-hidden">
              
              {/* Draft Entry Form Panel */}
              <div className="rounded-2xl bg-[#fff6ee]/80 p-4 border border-[#ffd9ec]/50 shadow-sm mb-4">
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient (e.g., ghost boy, ex, him)"
                  className="mb-2.5 w-full rounded-full border border-[#ffd9ec] bg-[#fffdfc] px-4 py-2 text-sm font-medium text-[#5b4452] outline-none placeholder:text-[#9b7e94]/60 focus:border-[#f7a8c4]"
                />
                <textarea
                  value={urgeText}
                  onChange={(e) => setUrgeText(e.target.value)}
                  placeholder="Type the message you want to get out of your system..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-[#ffd9ec] bg-[#fffdfc] px-4 py-3 text-sm font-medium text-[#5b4452] outline-none placeholder:text-[#9b7e94]/60 focus:border-[#f7a8c4]"
                />
                
                <div className="mt-1 grid grid-cols-2 gap-3">
                  <button
                    onClick={buryTheDraft}
                    className="rounded-full bg-[#d6588f] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Send to the Vault 🔒
                  </button>
                  <button
                    disabled
                    className="cursor-not-allowed rounded-full border border-[#f7a8c4]/40 bg-[#ffd9ec]/30 px-3 py-2 text-xs font-bold text-[#9b7e94]/60"
                    title="This option is disabled to protect your dignity!"
                  >
                    Self Sabotage 🚫
                  </button>
                </div>

                {justBuried && (
                  <p className="mt-2 text-center text-xs font-bold text-[#d6588f]">
                    ⊹ draft laid to rest beautifully. you win this round!
                  </p>
                )}
              </div>

              {/* Scrollable Buried Archive List */}
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#d6588f]">
                Buried Drafts Logs
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 rounded-xl">
                {buriedDrafts.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-[#9b7e94] border border-dashed border-[#ffd9ec] rounded-2xl p-4">
                    <span className="text-2xl">(｀・ω・´)</span>
                    <p className="text-xs font-semibold">Cemetery is empty. No risky drafts sent to the grave yet!</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {buriedDrafts.map((draft) => {
                      const isRevealed = !!revealedDrafts[draft.id];
                      return (
                        <li
                          key={draft.id}
                          className="rounded-xl border border-l-4 border-[#ffd9ec] border-l-[#d6588f] bg-[#fffdfc] p-3 shadow-sm"
                        >
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="font-bold text-[#d6588f]">
                              To: {draft.to}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-[#ffd9ec] px-2 py-0.5 font-bold text-[10px] text-[#d6588f] uppercase tracking-wider">
                                R.I.P.
                              </span>
                              <button
                                onClick={() => togglePeek(draft.id)}
                                className="rounded bg-[#fff6ee] border border-[#ffd9ec] px-1.5 py-0.5 text-[10px] font-bold text-[#d6588f] hover:bg-[#ffd9ec]/40"
                              >
                                {isRevealed ? "Hide 🙈" : "Peek 👁️"}
                              </button>
                            </div>
                          </div>
                          <p 
                            className={`text-sm font-medium transition-all duration-200 ${
                              isRevealed 
                                ? "text-[#9b7e94] line-through decoration-[#d6588f]/40 decoration-2" 
                                : "text-transparent bg-clip-text bg-gradient-to-r from-[#9b7e94] to-[#9b7e94] select-none blur-sm"
                            }`}
                          >
                            {draft.text}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

            </div>
          </section>

        </main>

        {/* ============================= FOOTER ============================= */}
        <footer className="mt-10 text-center text-xs font-bold text-[#9b7e94]">
          made with soft hands and a softer heart, just for you (ᵔ◕ᴥ◕ᵔ)
        </footer>

      </div>
    </div>
  );
}