import { useState } from "react";
import "./index.css";

/* ---------- Design tokens ---------- */
const C = {
  bg: "#0D0F1C",
  cream: "#F3EFE6",
  amber: "#FFB15C",
  muted: "rgba(243,239,230,0.72)",
  line: "rgba(243,239,230,0.15)",
  card: "rgba(255,255,255,0.03)",
};

/* ---------- Data ---------- */
const BRANDS = {
  cars: ["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Kia", "Toyota", "Honda", "MG", "Skoda", "Volkswagen", "Renault", "Nissan", "Citroën", "Jeep", "BYD", "BMW", "Mercedes-Benz", "Audi", "Volvo"],
  two: ["Hero MotoCorp", "Honda", "TVS", "Bajaj", "Royal Enfield", "Yamaha", "Suzuki", "Ather", "Ola Electric"],
  cv: ["Tata Motors", "Ashok Leyland", "Mahindra", "Eicher", "BharatBenz", "Force Motors"],
};
const SEGMENTS = [
  { id: "cars", label: "Cars" },
  { id: "two", label: "Two-wheelers" },
  { id: "cv", label: "Commercial vehicles" },
];
const USES = [
  { id: "sales", label: "Sales", desc: "Enquiry follow-up and test drive booking" },
  { id: "service", label: "Service", desc: "Service due reminder with pickup and drop" },
  { id: "feedback", label: "Feedback", desc: "Post-service or post-delivery feedback" },
  { id: "insurance", label: "Insurance", desc: "Renewal reminder and quote" },
];
const LANGS = ["Gujarati", "Hindi", "English"];

const BENEFITS = [
  { title: "Live in 7 days", text: "Sales and service agents set up for your dealership and taking calls within a week." },
  { title: "Every call on a dashboard", text: "Analytics for each call, with a calendar view of bookings, follow-ups and outcomes." },
  { title: "WhatsApp follow-up built in", text: "As a Meta Tech Provider, every conversation connects to WhatsApp for follow-up after the call." },
];
const PRICING = [
  { big: "₹25,000", sub: "One-time setup", text: "Sales and service agents plus the dashboard. AMC of ₹25,000 applies from year 2." },
  { big: "₹6 per minute", sub: "Up to 10,000 minutes a month", text: "Pay only for the minutes your agents talk." },
  { big: "₹5 per minute", sub: "Above 10,000 minutes a month", text: "The lower rate applies to all minutes in that month." },
];
const CLIENTS = ["[SKODA DEALER NAME, CITY]", "[HONDA TWO-WHEELER DEALER NAME]", "[YAMAHA DEALER NAME]", "[TVS DEALER NAME]"];

/* ---------- Config: replace these ---------- */
const SALES_WHATSAPP_LINK = "https://wa.me/91XXXXXXXXXX";
const MEETING_LINK = "https://your-booking-link";
const MASCOT_SRC = "/mascot.png"; // Naavya mascot image
const JMS_LOGO_SRC = "/jms-tech-logo.png"; // footer logo

/* ---------- Styles ---------- */

const pill = (on) => ({
  minHeight: 44, padding: "0 18px", borderRadius: 999, fontWeight: 600, fontSize: 15,
  border: `1px solid ${on ? C.cream : "rgba(243,239,230,0.4)"}`,
  background: on ? C.cream : "transparent",
  color: on ? C.bg : C.cream,
});
const tile = (on) => ({
  border: `1.5px solid ${on ? C.amber : "rgba(243,239,230,0.28)"}`,
  background: on ? "rgba(255,177,92,0.18)" : C.card,
  color: on ? C.amber : C.cream,
});

const StepTitle = ({ n, children }) => (
  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
    <span style={{ color: C.amber }}>{n}.</span> {children}
  </h2>
);

/* ---------- Component ---------- */
export default function App() {
  const [seg, setSeg] = useState("cars");
  const [brand, setBrand] = useState("Hyundai");
  const [use, setUse] = useState("service");
  const [lang, setLang] = useState("Hindi");
  const [dealer, setDealer] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const pick = (setter) => (v) => { setter(v); setSent(false); };

  const from = dealer.trim()
    ? city.trim() ? `${dealer.trim()}, ${city.trim()}` : dealer.trim()
    : `your ${brand} dealership`;
  const drive = seg === "two" ? "test ride" : seg === "cv" ? "demo drive" : "test drive";
  const lines = {
    sales: `You recently enquired about a new ${brand}. Would you like to book a ${drive} this week?`,
    service: `Your ${brand} is due for service. Shall I book a slot and arrange pickup and drop?`,
    feedback: `Your ${brand} was serviced with us recently. May I take a minute for your feedback?`,
    insurance: `The insurance on your ${brand} is due for renewal soon. May I share the renewal quote?`,
  };
  const useLabel = USES.find((u) => u.id === use).label;

  const submit = () => {
    if (!dealer.trim()) return setError("Enter your dealership name so the agent can use it on the call."), setSent(false);
    if (phone.length !== 10) return setError("Enter a 10-digit mobile number."), setSent(false);
    if (!consent) return setError("Tick the consent box to receive the demo call."), setSent(false);
    setError("");
    setSent(true);
    // TODO: call your backend here (send OTP, then trigger the demo call)
  };

  return (
    <div className="nv">

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="wrap" style={{ paddingTop: 14, paddingBottom: 14, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <img src={MASCOT_SRC} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: 24 }}>Naavya AI</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.amber, background: "rgba(255,177,92,0.18)", padding: "5px 12px", borderRadius: 999 }}>
              Auto Dealer Demo
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href={SALES_WHATSAPP_LINK} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 20px", borderRadius: 999, border: "1px solid rgba(243,239,230,0.4)", fontWeight: 500, fontSize: 15, textDecoration: "none", color: C.cream }}>
              Talk to Sales
            </a>
            <a href="#meeting" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 20px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none", background: C.cream, color: C.bg }}>
              Book a meeting
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 36, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
        <div style={{ flex: "999 1 520px", minWidth: 0 }}>
          <p style={{ margin: "0 0 18px", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.amber }}>
            AI voice agent for automobile dealerships
          </p>
          <h1 style={{ margin: 0, fontWeight: 600, fontSize: "clamp(36px,5.2vw,64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Hear your dealership's AI agent call you. Right now.
          </h1>
          <p style={{ margin: "22px 0 0", maxWidth: 640, fontSize: 19, lineHeight: 1.55, color: C.muted }}>
            Pick your brand, choose sales, service, feedback or insurance, and your phone rings with a live demo call in your customers' language.
          </p>
        </div>
        <img src={MASCOT_SRC} alt="Naavya, the AI voice agent mascot wearing a headset" style={{ flex: "1 1 220px", maxWidth: 300, width: "100%", height: "auto", objectFit: "contain" }} />
      </section>

      {/* Demo builder */}
      <section className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          {/* Form card */}
          <div style={{ flex: "999 1 560px", minWidth: 0, background: C.card, border: `1px solid ${C.line}`, borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", gap: 36 }}>
            {/* Step 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <StepTitle n={1}>Select your brand</StepTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SEGMENTS.map((s) => (
                  <button key={s.id} type="button" aria-pressed={seg === s.id} style={pill(seg === s.id)}
                    onClick={() => { setSeg(s.id); setBrand(BRANDS[s.id][0]); setSent(false); }}>
                    {s.label}
                  </button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
                {BRANDS[seg].map((b) => (
                  <button key={b} type="button" aria-pressed={brand === b} onClick={() => pick(setBrand)(b)}
                    style={{ minHeight: 56, padding: "8px 12px", borderRadius: 14, fontWeight: 600, fontSize: 15, textAlign: "center", ...tile(brand === b) }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <StepTitle n={2}>Choose the call</StepTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
                {USES.map((u) => {
                  const on = use === u.id;
                  return (
                    <button key={u.id} type="button" aria-pressed={on} onClick={() => pick(setUse)(u.id)}
                      style={{ minHeight: 96, padding: 16, borderRadius: 16, textAlign: "left", display: "flex", flexDirection: "column", gap: 6, ...tile(on), color: C.cream }}>
                      <span style={{ fontWeight: 600, fontSize: 17, color: on ? C.amber : C.cream }}>{u.label}</span>
                      <span style={{ fontSize: 14, lineHeight: 1.4, color: C.muted }}>{u.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <StepTitle n={3}>Language and your details</StepTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {LANGS.map((l) => (
                  <button key={l} type="button" aria-pressed={lang === l} style={pill(lang === l)} onClick={() => pick(setLang)(l)}>
                    {l}
                  </button>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Naavya AI works in 11 Indian languages. This demo runs in three.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
                <div className="field">
                  <label htmlFor="dealer">Dealership name</label>
                  <input id="dealer" type="text" autoComplete="organization" placeholder="e.g. ABC Motors" value={dealer} onChange={(e) => setDealer(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="city">City</label>
                  <input id="city" type="text" autoComplete="address-level2" placeholder="e.g. Ahmedabad" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="phone">Mobile number (+91)</label>
                  <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setSent(false); }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <input id="consent" type="checkbox" checked={consent} onChange={() => setConsent(!consent)}
                  style={{ width: 22, height: 22, margin: "2px 0 0", flex: "none", accentColor: C.amber }} />
                <label htmlFor="consent" style={{ fontSize: 14, lineHeight: 1.5, color: C.muted }}>
                  I agree to receive one demo call and a WhatsApp summary from Naavya AI on this number.
                </label>
              </div>

              {error && (
                <p role="alert" style={{ margin: 0, padding: "12px 14px", borderRadius: 12, background: "rgba(255,106,61,0.16)", border: "1px solid rgba(255,106,61,0.5)", color: "#FFD3C4", fontSize: 15, fontWeight: 500 }}>
                  {error}
                </p>
              )}

              <button type="button" onClick={submit}
                style={{ minHeight: 56, padding: "0 30px", borderRadius: 999, border: "none", background: C.amber, color: C.bg, fontWeight: 700, fontSize: 18, alignSelf: "flex-start" }}>
                Verify with OTP and call me now
              </button>
              <p style={{ margin: 0, fontSize: 13, color: C.muted }}>One demo call per verified number. Calls run for up to 90 seconds.</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{ flex: "1 1 320px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.cream, color: C.bg, borderRadius: 24, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2A6E" }}>Your demo call</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
                {[["Brand", brand], ["Call type", useLabel], ["Language", lang]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ color: "#4A4D5A" }}>{k}</span>
                    <span style={{ fontWeight: 600, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(13,15,28,0.25)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontSize: 13, color: "#4A4D5A" }}>How the call opens (shown in English, spoken in {lang})</p>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>
                  “Namaste, this is Naavya calling from {from}. {lines[use]}”
                </p>
              </div>
            </div>

            {sent && (
              <div role="status" style={{ background: "rgba(191,230,211,0.12)", border: "1px solid rgba(191,230,211,0.5)", borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 17, color: "#BFE6D3" }}>OTP sent to +91 {phone}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#BFE6D3" }}>
                  Once verified, your phone rings within 30 seconds. A WhatsApp summary of the call follows right after.
                </p>
              </div>
            )}

            <div className="panel" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>After the call you get</p>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8, fontSize: 15, lineHeight: 1.45, color: C.muted }}>
                <li>A WhatsApp summary of your own demo call</li>
                <li>A look at the dashboard entry for that call</li>
                <li>Pricing and a link to book a meeting</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 28 }}>
          <h2 className="h2">Why dealerships choose Naavya AI</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {BENEFITS.map((b) => (
              <div key={b.title} className="panel" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: C.amber }}>{b.title}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: C.muted }}>{b.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}>
              Dealerships already using Naavya AI
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontSize: 15, fontWeight: 500 }}>
              {CLIENTS.map((c) => (
                <span key={c} style={{ padding: "10px 16px", border: "1px solid rgba(243,239,230,0.3)", borderRadius: 999 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <h2 className="h2" style={{ marginBottom: 24 }}>Simple pricing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {PRICING.map((p) => (
              <div key={p.big} className="panel" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ margin: 0, fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em" }}>{p.big}</p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.amber }}>{p.sub}</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: C.muted }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="meeting" style={{ background: C.cream, color: C.bg }}>
        <div className="wrap" style={{ paddingTop: 52, paddingBottom: 52, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: "clamp(26px,3.2vw,36px)", fontWeight: 600, letterSpacing: "-0.025em" }}>
              Liked the call? See it for your dealership.
            </h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#33364A" }}>
              A 15-minute meeting covers your call volumes, languages and go-live plan.
            </p>
          </div>
          <a href={MEETING_LINK} style={{ display: "inline-flex", alignItems: "center", minHeight: 56, padding: "0 30px", borderRadius: 999, background: C.bg, color: C.cream, fontWeight: 600, fontSize: 17, textDecoration: "none" }}>
            Book a meeting
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="wrap" style={{ paddingTop: 32, paddingBottom: 32, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
          <div style={{ background: C.cream, borderRadius: 14, padding: "8px 14px", flex: "none" }}>
            <img src={JMS_LOGO_SRC} alt="JMS Tech logo" style={{ display: "block", width: 120, height: "auto" }} />
          </div>
          <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 13, lineHeight: 1.6, color: C.muted }}>
            <p style={{ margin: 0, color: C.cream, fontWeight: 600 }}>
              Naavya AI is a product of JMS TechNova Private Limited (JMS Tech), Ahmedabad.
            </p>
            <p style={{ margin: 0 }}>Anthropic Claude Partner · Sarvam AI Startup Program · Microsoft ISV Partner · Meta Tech Provider · NASSCOM · GESIA</p>
            <p style={{ margin: 0 }}>
              This is a demonstration for authorised dealerships. Naavya AI is not affiliated with, endorsed by or sponsored by any vehicle manufacturer. All brand names belong to their respective owners and are used only to identify the dealership type.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
