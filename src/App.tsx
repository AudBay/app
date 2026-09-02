import { useState } from "react";
import bayfieldsLogo from "@assets/Bayfields_Logo_1782311735117.jpg";

const LOSS_LEVELS = ["Normal", "Mild", "Moderate", "Severe", "Profound"];
const LOSS_TYPES = ["No Loss", "Sensorineural", "Conductive", "Mixed"];
const MANUFACTURERS = ["Starkey", "Oticon", "Widex", "Rexton", "Signia"];

const LOSS_COLORS: Record<string, string> = {
  Normal: "#2e7d5e", Mild: "#d4900a", Moderate: "#c96820",
  Severe: "#b83030", Profound: "#7b1fa2",
};
const LOSS_GRADIENTS: Record<string, string> = {
  Normal:   "linear-gradient(135deg,#2e7d5e,#43a87e)",
  Mild:     "linear-gradient(135deg,#d4900a,#f0b429)",
  Moderate: "linear-gradient(135deg,#c96820,#e07b30)",
  Severe:   "linear-gradient(135deg,#b83030,#d94f4f)",
  Profound: "linear-gradient(135deg,#6a1a8a,#9c27b0)",
};
const LOSS_PCT: Record<string, number> = {
  Normal: 5, Mild: 22, Moderate: 46, Severe: 70, Profound: 93,
};
const LOSS_DESCRIPTIONS: Record<string, string> = {
  Normal:   "Hearing falls within the normal range. No hearing loss was detected.",
  Mild:     "Difficulty following conversations in noisy environments is common.",
  Moderate: "Understanding speech without a hearing solution is likely difficult, especially in groups.",
  Severe:   "Hearing conversation without amplification is very difficult. Hearing solutions are strongly recommended.",
  Profound: "Understanding speech without powerful amplification is extremely challenging.",
};

const MFR: Record<string, { tagline: string; known: string; highlights: string[]; why: string }> = {
  Starkey: {
    tagline: "Intelligent hearing technology with a personal touch",
    known: "Award-winning AI-powered sound processing",
    highlights: [
      "Edge Mode+ AI adapts your hearing instantly to any environment",
      "Healthable technology monitors physical activity and brain health",
      "Integrated fall detection and alerts to loved ones",
      "Industry-leading rechargeable battery performance",
      "Thrive app gives full personalised control from your phone",
    ],
    why: "Ideal for clients who want technology that supports overall wellbeing, not just hearing.",
  },
  Oticon: {
    tagline: "Oticon Reveal: dual AI for speech, context and natural listening",
    known: "Rechargeable miniRITE family with dual AI and 4D Sensor technology",
    highlights: [
      "Dual AI systems use MoreSound Intelligence™ to understand the listening context and MoreSound Amplifier™ to support clear, detailed speech",
      "4D Sensor technology helps Reveal respond naturally to movement and changing listening environments",
      "Clear Dynamics and Spatial Sound support comfortable listening, natural sound quality and spatial awareness",
      "Rechargeable miniRITE design with integrated telecoil, Bluetooth LE Audio, hands-free streaming and the Oticon Companion app",
    ],
    why: "A strong choice for clients who want intelligent speech support that responds to both the conversation and the wider listening context.",
  },
  Widex: {
    tagline: "The new Widex Allure AI: natural sound meets AI precision",
    known: "Launched May 2026: Widex's most advanced hearing solution ever",
    highlights: [
      "W1 chip + AI Deep Neural Network (DNN) for a turbo boost in noise",
      "Industry-leading 0.5ms ZeroDelay™ for the most natural, distortion-free sound",
      "Speech Enhancer Pro with 52-band analysis across 11 listening environments",
      "AI Sound & Quick Assistants learn your preferences and adapt in real time",
      "Bluetooth LE Audio with hands-free calling and up to 27 hours battery life",
    ],
    why: "The perfect choice for clients who want Widex's signature natural sound combined with the very latest AI-powered speech clarity technology.",
  },
  Rexton: {
    tagline: "Premium hearing technology with outstanding value",
    known: "Trusted German engineering with Signia platform technology",
    highlights: [
      "Powered by the proven Signia platform for reliable performance",
      "Own Voice Processing eliminates the 'own voice' effect naturally",
      "Bluetooth connectivity for direct streaming from phones and TVs",
      "Rechargeable and traditional battery options available",
      "TeleCare remote fine-tuning from the comfort of your home",
    ],
    why: "Excellent choice for clients seeking premium German-engineered performance at accessible price points.",
  },
  Signia: {
    tagline: "Signia maX: adaptive AI for confident listening in changing environments",
    known: "The new Signia maX platform with Acoustic Intelligence™",
    highlights: [
      "Acoustic Intelligence™ coordinates four Deep Neural Networks for speech, soundscape, noise and own-voice awareness",
      "RealTime Conversation Enhancement AI processes 75% more data points per second than Signia IX",
      "Own Voice Processing, Ambient Scene Adaptation and Dynamic Noise Control AI support a more natural listening experience",
      "Pure Charge&Go MaX offers rechargeable RIC styling with Bluetooth Classic, LE Audio, telecoil and Auracast-ready connectivity",
    ],
    why: "A strong option for adaptive support in busy group conversations, with natural own-voice handling and broad connectivity.",
  },
};

const NEXT_STEPS = [
  { icon: "🎧", title: "Book a Hearing Solution Demonstration", desc: "Experience the difference with a no-obligation demonstration. Hear the improvement for yourself." },
  { icon: "💬", title: "Speak with Our Specialist", desc: "Our audiologist will guide you through every option tailored to your lifestyle." },
  { icon: "✨", title: "Connect Member Offer", desc: "Become a Connect Member today and receive £150 off your new hearing solutions." },
  { icon: "🌍", title: "Reconnect with the World", desc: "Better hearing means better conversations and better long-term cognitive health." },
];

const HEARING_FACTS = [
  { icon: "🧠", title: "The brain-hearing link", body: "Research consistently links untreated hearing loss with a higher risk of cognitive decline. Treating hearing loss early is considered one of the most impactful steps you can take for long-term brain health." },
  { icon: "👥", title: "More common than you think", body: "Over 11 million people in the UK live with hearing loss; that's 1 in 6. It is the third most common health condition in the world." },
  { icon: "⏱", title: "Average delay is 10 years", body: "Most people wait a decade between noticing hearing loss and seeking help. Acting earlier leads to significantly better long-term outcomes." },
  { icon: "🔋", title: "Modern hearing solutions are remarkable", body: "Today's hearing solutions are smaller than ever, with rechargeable batteries, Bluetooth streaming, AI sound processing, and app-based personalisation." },
];

const UNDERSTANDING = [
  ["What causes it?", "Most hearing loss is sensorineural, caused by gradual wear to the delicate hair cells inside the inner ear. This process is painless and often goes unnoticed for years."],
  ["Can it worsen?", "Untreated hearing loss tends to progress over time. The sooner you act, the better your long-term hearing health will be."],
  ["How solutions help", "Modern hearing solutions amplify and clarify sound in real time, making conversation feel effortless, even in busy or noisy environments."],
  ["The cognitive link", "Research shows that treating hearing loss significantly reduces the risk of cognitive decline, depression, and social isolation."],
];

interface EarState { level: string; type: string; }
interface FormState {
  clientId: string;
  testDate: string; audiologistName: string;
  leftEar: EarState; rightEar: EarState;
  manufacturer: string; notes: string;
}

/* ── Small reusable pieces ─────────────────────── */
function Card({ icon, title, children, optional }: { icon: string; title: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <span className="card-title">{title}</span>
        {optional && <span className="card-optional">(optional)</span>}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="field-label">{children}</div>;
}

function Inp(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="inp" {...props} />;
}

function Sel(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="inp" {...props} style={{ cursor: "pointer" }} />
  );
}

/* ── PDF sub-components ────────────────────────── */
function PdfEarCard({ level, type, side, label }: { level: string; type: string; side: string; label: string }) {
  const color = LOSS_COLORS[level] || "#aaa";
  const gradient = LOSS_GRADIENTS[level] || "linear-gradient(135deg,#aaa,#ccc)";
  const pct = LOSS_PCT[level] || 0;
  return (
    <div className="pdf-ear-card">
      <div className="pdf-ear-header" style={{
        background: side === "left" ? "#e8f0fb" : "#fdeee3",
        color: side === "left" ? "#1565c0" : "#b85c1a",
      }}>{label}</div>
      <div className="pdf-ear-body">
        <div className="pdf-ear-level" style={{ color }}>{level || "-"}</div>
        <div className="pdf-ear-type">{type || "-"}</div>
        <div className="pdf-bar-bg">
          <div className="pdf-bar-fill" style={{ width: `${pct}%`, background: gradient }} />
        </div>
        <div className="pdf-ear-desc">{level ? LOSS_DESCRIPTIONS[level] : ""}</div>
      </div>
    </div>
  );
}

/* ── Main App ──────────────────────────────────── */
export default function App() {
  const [form, setForm] = useState<FormState>({
    clientId: "",
    testDate: new Date().toISOString().split("T")[0],
    audiologistName: "",
    leftEar: { level: "", type: "" },
    rightEar: { level: "", type: "" },
    manufacturer: "", notes: "",
  });
  const [tab, setTab] = useState<"form" | "preview">("form");
  const [done, setDone] = useState(false);

  const set = (f: keyof FormState, v: string) => setForm(p => ({ ...p, [f]: v }));
  const setEar = (ear: "leftEar" | "rightEar", f: keyof EarState, v: string) =>
    setForm(p => ({ ...p, [ear]: { ...p[ear], [f]: v } }));

  const clearForm = () => {
    setForm({
      clientId: "",
      testDate: new Date().toISOString().split("T")[0],
      audiologistName: "",
      leftEar: { level: "", type: "" },
      rightEar: { level: "", type: "" },
      manufacturer: "",
      notes: "",
    });
    setDone(false);
    setTab("form");
  };

  const valid = !!(form.testDate && form.audiologistName &&
    form.leftEar.level && form.leftEar.type && form.rightEar.level && form.rightEar.type && form.manufacturer);

  const mfr = MFR[form.manufacturer] || null;
  const dateStr = form.testDate
    ? new Date(form.testDate + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const hasLeft = form.leftEar.level && form.leftEar.level !== "Normal";
  const hasRight = form.rightEar.level && form.rightEar.level !== "Normal";
  const count = (hasLeft ? 1 : 0) + (hasRight ? 1 : 0);
  const recText = count === 2
    ? "Hearing solutions are recommended for both ears based on your assessment."
    : count === 1
    ? `A hearing solution is recommended for your ${hasLeft ? "left" : "right"} ear based on your assessment.`
    : "No hearing solutions are currently recommended. Annual monitoring is advised.";

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Top Bar ── */}
      <div className="topbar no-print">
        <img src={bayfieldsLogo} alt="Bayfields Opticians & Audiologists" className="topbar-logo" />
        <div style={{ flex: 1 }}>
          <div className="topbar-title">Hearing Assessment Report</div>
          <div className="topbar-sub">Bayfields Opticians &amp; Audiologists</div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabbar no-print">
        {(["form", done && "preview"] as (string | false)[]).filter(Boolean).map(t => (
          <button
            key={t as string}
            className={`tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t as "form" | "preview")}
          >
            {t === "form" ? "📋  Assessment Form" : "📄  PDF Preview"}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          FORM
      ══════════════════════════════════════════ */}
      {tab === "form" && (
        <div className="form-shell">

          {/* Client Details */}
          <Card icon="👤" title="Client & Clinic Details">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              <div>
                <FieldLabel>Client ID (optional)</FieldLabel>
                <Inp placeholder="e.g. BF-12345" value={form.clientId} onChange={e => set("clientId", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <div>
                  <FieldLabel>Test Date *</FieldLabel>
                  <Inp type="date" value={form.testDate} onChange={e => set("testDate", e.target.value)} />
                </div>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <FieldLabel>Audiologist Name *</FieldLabel>
                <Inp placeholder="e.g. Dr. Sarah O'Brien" value={form.audiologistName} onChange={e => set("audiologistName", e.target.value)} />
              </div>
            </div>
          </Card>

          {/* Hearing Results */}
          <Card icon="📊" title="Hearing Test Results">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {([["leftEar", "left", "Left Ear"], ["rightEar", "right", "Right Ear"]] as const).map(([key, side, label]) => (
                <div key={key} className="ear-panel">
                  <div className="ear-panel-header" style={{
                    background: side === "left" ? "#e8f0fb" : "#fdeee3",
                    color: side === "left" ? "#1565c0" : "#b85c1a",
                  }}>{label}</div>
                  <div className="ear-panel-body">
                    <div>
                      <FieldLabel>Degree of Loss *</FieldLabel>
                      <div className="pill-group">
                        {LOSS_LEVELS.map(l => (
                          <button
                            key={l}
                            className={`loss-pill ${form[key].level === l ? "active-pill" : ""}`}
                            style={form[key].level === l ? { background: LOSS_GRADIENTS[l] } : {}}
                            onClick={() => setEar(key, "level", l)}
                          >{l}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Type of Loss *</FieldLabel>
                      <div className="pill-group">
                        {LOSS_TYPES.map(t => (
                          <button
                            key={t}
                            className={`type-pill ${form[key].type === t ? "active-type" : ""}`}
                            onClick={() => setEar(key, "type", t)}
                          >{t}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Manufacturer */}
          <Card icon="🎧" title="Recommended Manufacturer *">
            <div className="mfr-grid">
              {MANUFACTURERS.map(m => (
                <button
                  key={m}
                  className={`mfr-card ${form.manufacturer === m ? "sel" : ""}`}
                  onClick={() => set("manufacturer", m)}
                >
                  <div className="mfr-name">{m}</div>
                  <div className="mfr-desc">{MFR[m].known}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card icon="📝" title="Audiologist Notes" optional>
            <textarea
              placeholder="e.g. Client reports difficulty in noisy environments. Tinnitus noted in left ear."
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              className="inp"
              style={{ minHeight: 80, resize: "vertical" }}
            />
          </Card>

          <div className="form-actions">
            <button type="button" className="clear-btn" onClick={clearForm}>
              Clear Form
            </button>
            <button type="button" className="gen-btn" disabled={!valid} onClick={() => { setDone(true); setTab("preview"); }}>
              Generate PDF Report →
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          PREVIEW
      ══════════════════════════════════════════ */}
      {tab === "preview" && done && (
        <div className="preview-shell">
          <div className="preview-actions no-print">
            <button className="print-btn" onClick={() => window.print()}>🖨️ Print / Save as PDF</button>
            <button className="edit-btn" onClick={() => setTab("form")}>← Edit Form</button>
            <button className="clear-btn preview-clear-btn" onClick={clearForm}>Clear Form</button>
          </div>

          {/* ── A4 PAGE ── */}
          <div className="pdf-page">

            {/* Header */}
            <div className="pdf-header">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <img src={bayfieldsLogo} alt="Bayfields" style={{ height: 46, width: "auto", background: "white", borderRadius: 8, padding: "5px 12px", objectFit: "contain", flexShrink: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }} />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700, marginBottom: 4, letterSpacing: 0.3 }}>
                    Hearing Assessment Report
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20, color: "rgba(255,255,255,0.7)", fontSize: 9.5 }}>
                    {form.clientId && <span><strong style={{ color: "white", letterSpacing: 0.3 }}>Client ID:</strong>&nbsp;{form.clientId}</span>}
                    <span><strong style={{ color: "white", letterSpacing: 0.3 }}>Date:</strong>&nbsp;{dateStr}</span>
                    <span><strong style={{ color: "white", letterSpacing: 0.3 }}>Audiologist:</strong>&nbsp;{form.audiologistName}</span>
                  </div>
                </div>
                <div style={{ width: 100 }} />
              </div>
            </div>
            <div className="pdf-gold-bar" />

            {/* Body */}
            <div className="pdf-body">

              {/* ROW 1: Results + Understanding */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>

                {/* Ear results col */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="pdf-section-title">Your Hearing Test Results</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <PdfEarCard level={form.leftEar.level} type={form.leftEar.type} side="left" label="Left Ear" />
                    <PdfEarCard level={form.rightEar.level} type={form.rightEar.type} side="right" label="Right Ear" />
                  </div>
                  <div className="pdf-summary-box">
                    <strong>Summary:</strong> {recText}
                  </div>
                  {form.notes && (
                    <div>
                      <div className="pdf-section-title" style={{ marginTop: 4 }}>Audiologist Notes</div>
                      <div className="pdf-notes-box">{form.notes}</div>
                    </div>
                  )}
                </div>

                {/* Understanding col */}
                <div>
                  <div className="pdf-section-title">Understanding Your Hearing Loss</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                    {UNDERSTANDING.map(([t, b]) => (
                      <div key={t} className="pdf-info-tile">
                        <div className="pdf-info-title">{t}</div>
                        <div className="pdf-info-body">{b}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROW 2: Facts */}
              <div>
                <div className="pdf-section-title">Key Facts About Hearing Health</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  {HEARING_FACTS.map((f, i) => (
                    <div key={i} className="pdf-fact-tile">
                      <div className="pdf-fact-icon">{f.icon}</div>
                      <div className="pdf-fact-title">{f.title}</div>
                      <div className="pdf-fact-body">{f.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROW 3: Brand + Next Steps */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 13 }}>

                {/* Brand */}
                {mfr && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="pdf-section-title">Your Recommended Brand</div>
                    <div className="pdf-brand-box">
                      <div className="pdf-brand-header">
                        <div className="pdf-brand-name">{form.manufacturer} {count === 1 ? "Hearing Solution" : "Hearing Solutions"}</div>
                        <div className="pdf-brand-tagline">{mfr.tagline}</div>
                      </div>
                      <div className="pdf-brand-body">
                        <div className="pdf-brand-why">{mfr.why}</div>
                        <div className="pdf-brand-highlights">
                          {mfr.highlights.map((h, i) => (
                            <div key={i} className="pdf-brand-highlight">
                              <div className="pdf-brand-dot" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="pdf-section-title">Your Next Steps</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, flex: 1 }}>
                    {NEXT_STEPS.map((s, i) => (
                      <div key={i} className="pdf-step">
                        <div className="pdf-step-icon">{s.icon}</div>
                        <div className="pdf-step-title">{s.title}</div>
                        <div className="pdf-step-desc">
                          {s.title === "Connect Member Offer"
                            ? <span>Become a Connect Member to receive <strong>£150</strong> off your new hearing solutions.</span>
                            : s.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pdf-footer">
                <div>
                  <div className="pdf-footer-headline">Your hearing. Your future. Our commitment.</div>
                  <div className="pdf-footer-sub">This report is confidential and prepared exclusively for you. Our team is dedicated to supporting your hearing health every step of the way.</div>
                </div>
                <div className="pdf-footer-meta">Hearing Assessment Report<br />Confidential | {dateStr}</div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
