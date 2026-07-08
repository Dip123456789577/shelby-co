import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroNoir from "@/assets/hero-noir.jpg";
import char1 from "@/assets/char-1.jpg";
import char2 from "@/assets/char-2.jpg";
import char3 from "@/assets/char-3.jpg";
import char4 from "@/assets/char-4.jpg";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import gal4 from "@/assets/gal-4.jpg";

export const Route = createFileRoute("/")({
  component: ShelbyPage,
});

const NAV = [
  ["home", "Home"], ["story", "Story"], ["characters", "Characters"],
  ["seasons", "Seasons"], ["trailer", "Trailer"], ["gallery", "Gallery"],
  ["ratings", "Ratings"], ["reviews", "Reviews"], ["awards", "Awards"],
  ["timeline", "Timeline"], ["faq", "FAQ"], ["contact", "Contact"],
] as const;

const CHARACTERS = [
  { img: char1, name: "Thomas Grey", actor: "Alexander Vance", role: "Head of the Family",
    bio: "A decorated cavalryman turned businessman, Thomas returned from the trenches with a cold intellect and colder ambitions — dragging the family from the Small Heath backstreets to the boardrooms of London." },
  { img: char2, name: "Elizabeth Grey", actor: "Cora Byrne", role: "The Matriarch",
    bio: "Aunt, arbiter, and the true iron spine of the house. When the men lose their heads, Elizabeth keeps the ledger, the whiskey, and the peace." },
  { img: char3, name: "Arthur Grey", actor: "Rufus Blackwood", role: "The Eldest",
    bio: "Battle-scarred and quick to violence, Arthur is the family's fist. A soul carrying the smoke of the Somme, held together by bourbon and loyalty." },
  { img: char4, name: "Lord Ashcroft", actor: "Julian Hollis", role: "The Rival",
    bio: "An aristocrat with a manicured smile and a war chest of secrets. Where the Greys wield razors, he wields the state." },
];

const SEASONS = [
  { n: 1, year: 1919, eps: 6, title: "Small Heath Rising",
    summary: "A stolen crate of machine guns lands the family in the crosshairs of Scotland Yard — and forces Thomas's hand." },
  { n: 2, year: 1922, eps: 6, title: "London Calling",
    summary: "Expansion south of the river brings new enemies, older betrayals, and the first taste of legitimate power." },
  { n: 3, year: 1924, eps: 6, title: "The Russian Affair",
    summary: "White émigrés, stolen jewels, and a Vatican priest — the Greys learn that empires demand a heavier price." },
  { n: 4, year: 1926, eps: 6, title: "Blood on Snow",
    summary: "A Sicilian vendetta arrives on Christmas Eve. The family must close ranks — or bury each other." },
  { n: 5, year: 1929, eps: 6, title: "The Black Tide",
    summary: "Fascism rises across Europe. Thomas steps into Parliament with a razor in his coat and a bullet with his name on it." },
];

const RATINGS = [
  { label: "IMDb", score: 8.8, of: 10, fill: 88 },
  { label: "Rotten Tomatoes", score: 93, of: 100, fill: 93, suffix: "%" },
  { label: "Audience Score", score: 96, of: 100, fill: 96, suffix: "%" },
  { label: "Google Users", score: 97, of: 100, fill: 97, suffix: "%" },
];

const REVIEWS = [
  { by: "The Guardian", role: "Critic", stars: 5,
    text: "A stylistic masterwork — every frame a painting, every silence a threat. Television of the highest order." },
  { by: "Empire Magazine", role: "Critic", stars: 5,
    text: "Shelby & Co. rewrites the gangster saga with elegance, menace, and a soundtrack that hums like a loaded revolver." },
  { by: "Marla D.", role: "Viewer", stars: 5,
    text: "I've watched it four times. The costumes, the language, the cold-eyed loyalty — nothing else feels like this." },
  { by: "Rolling Stone", role: "Critic", stars: 5,
    text: "Operatic, brutal, tender. A period piece with the pulse of a modern thriller." },
];

const AWARDS = [
  { year: 2016, title: "BAFTA — Best Drama Series", tag: "Winner" },
  { year: 2018, title: "Royal Television Society — Best Actor", tag: "Winner" },
  { year: 2019, title: "Golden Globe — Best Drama", tag: "Nominated" },
  { year: 2021, title: "Emmy — Outstanding Cinematography", tag: "Winner" },
  { year: 2023, title: "SAG — Ensemble Cast", tag: "Winner" },
];

const TIMELINE = [
  { year: 1919, ev: "Thomas returns from France; the family business is reborn." },
  { year: 1922, ev: "Shelby & Co. Ltd. is registered; the first legal betting license granted." },
  { year: 1924, ev: "London expansion — Camden Town falls under Grey control." },
  { year: 1926, ev: "General Strike; the family arms both sides and profits." },
  { year: 1929, ev: "Thomas Grey elected Member of Parliament for Birmingham South." },
];

const BEHIND = [
  { k: "Production", v: "Filmed on 35mm across Yorkshire, Liverpool and the Black Country. Practical sets, practical smoke, no CGI backdrops." },
  { k: "Costume", v: "Over 4,000 hand-tailored garments — herringbone, tweed, silk crepe — sourced from period mills still in operation." },
  { k: "Locations", v: "Stanley Mills, Bradford; the Black Country Living Museum; Arley Hall — each dressed to vanish into 1920s Birmingham." },
  { k: "Direction", v: "Every frame is composed like a portrait: single light source, low key, gold rim. The camera never blinks first." },
];

const FAQ = [
  { q: "Is this an official production?", a: "No. This is a portfolio concept — a cinematic tribute site, independently designed and unaffiliated with any studio or network." },
  { q: "When can I watch the series?", a: "The trailer above is a placeholder. This site is a design showcase; it doesn't stream episodes." },
  { q: "Where was it filmed?", a: "Across the North of England, with primary shooting in Yorkshire, Liverpool and the Black Country Living Museum." },
  { q: "Who composed the score?", a: "An original score of blues-inflected strings and industrial percussion, arranged for a live 42-piece ensemble." },
  { q: "Will there be another season?", a: "Watch this space. When the Greys move, they move quietly — and all at once." },
];

function ShelbyPage() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openChar, setOpenChar] = useState<number | null>(null);
  const [openSeason, setOpenSeason] = useState<number | null>(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [muted, setMuted] = useState(true);

  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const particles = useMemo(
    () => mounted ? Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: 14 + Math.random() * 22,
      delay: -Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.4,
    })) : [],
    [mounted],
  );


  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global film grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.75 0 0 0 0 0.4 0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <Nav active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} muted={muted} setMuted={setMuted} />

      <main>
        <Hero particles={particles} />
        <Story />
        <Characters chars={CHARACTERS} openChar={openChar} setOpenChar={setOpenChar} />
        <Seasons seasons={SEASONS} openSeason={openSeason} setOpenSeason={setOpenSeason} />
        <Trailer />
        <Gallery />
        <Ratings />
        <Reviews reviewIdx={reviewIdx} setReviewIdx={setReviewIdx} />
        <Awards />
        <Timeline />
        <Behind />
        <Soundtrack />
        <Faq faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        <Newsletter />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* -------------------- NAV -------------------- */
function Nav({
  active, menuOpen, setMenuOpen, muted, setMuted,
}: {
  active: string; menuOpen: boolean; setMenuOpen: (b: boolean) => void;
  muted: boolean; setMuted: (b: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          <a href="#home" className="group flex items-center gap-3">
            <RazorMark />
            <div className="leading-none">
              <div className="font-display text-[1.35rem] gold-gradient-text tracking-tight">Shelby &amp; Co</div>
              <div className="label-caps text-[0.55rem] mt-1 text-bronze">Birmingham · Est. 1919</div>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-1">
            {NAV.slice(0, 9).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-3 py-2 label-caps text-[0.65rem] transition-colors ${
                  active === id ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gold shadow-[0_0_8px_var(--gold)]" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
              className="hidden md:inline-flex h-10 w-10 items-center justify-center border border-bronze/60 text-gold hover:bg-gold/10 transition"
            >
              {muted ? <IconMute /> : <IconSound />}
            </button>
            <a href="#contact" className="hidden md:inline-flex btn-gold">Join the Garrison</a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="xl:hidden h-10 w-10 flex items-center justify-center border border-bronze/60 text-gold"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block h-px w-5 bg-current transition ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-px w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px w-5 bg-current transition ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <nav className="relative h-full flex flex-col items-center justify-center gap-4 px-6">
          {NAV.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-3xl transition-all duration-500 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${active === id ? "gold-gradient-text" : "text-foreground/80 hover:text-gold"}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

/* -------------------- HERO -------------------- */
function Hero({ particles }: { particles: { id: number; left: number; size: number; dur: number; delay: number; opacity: number }[] }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroNoir}
          alt="Foggy 1920s Birmingham street at night"
          width={1920}
          height={1088}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_95%)]" />
      </div>


      {/* Drifting particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 rounded-full bg-gold/70 blur-[1px] animate-drift"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10 py-32 text-center">
        <p className="label-caps text-gold animate-fade-up">By Order of the Shelby Family</p>
        <div className="mt-6 hairline w-24 mx-auto" />
        <h1 className="mt-8 font-display font-bold leading-[0.95] tracking-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="block text-4xl sm:text-6xl md:text-7xl text-foreground/90">Shelby</span>
          <span className="block text-6xl sm:text-8xl md:text-[9rem] gold-gradient-text">
            Company <span className="text-foreground/70 text-4xl sm:text-6xl md:text-7xl align-top">Ltd</span>
          </span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          A cinematic descent into the smoke, gold and gunpowder of post-war Birmingham. Where family is
          currency, silence is strategy, and the razor stitched in the cap is never for decoration.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a href="#trailer" className="btn-gold group">
            <IconPlay /> Watch Trailer
          </a>
          <a href="#characters" className="btn-ghost">
            Explore Characters <IconArrow />
          </a>
        </div>

        <div className="mt-24 flex flex-col items-center gap-3 animate-bounce-slow">
          <span className="label-caps text-[0.55rem] text-bronze">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* -------------------- STORY -------------------- */
function Story() {
  return (
    <Section id="story" eyebrow="Chapter I" title="The Story">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p className="first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:gold-gradient-text">
            Birmingham, 1919. The war is over — but not for the men who came home. In the soot-black
            alleys of Small Heath, the Grey family runs the horses, the bookies, and quietly, the streets.
          </p>
          <p>
            Thomas Grey has plans bigger than the neighbourhood. Bigger than the city. Bigger than the crown
            itself. What begins as a stolen crate of Lewis guns becomes an empire of legal betting, legitimate
            distilleries — and, eventually, a seat in Parliament.
          </p>
          <p>
            But every empire has a debt. And in Birmingham, the ledger is always paid in blood.
          </p>
        </div>
        <div className="lg:col-span-5 grid gap-4">
          {[
            { k: "Era", v: "1919 — 1934" },
            { k: "Setting", v: "Small Heath, Birmingham" },
            { k: "Genre", v: "Period Crime · Drama" },
            { k: "Family Rank", v: "Head · Consigliere · Enforcer · Matriarch" },
          ].map((r) => (
            <div key={r.k} className="rim-card p-6 grain-overlay">
              <div className="label-caps text-bronze mb-2">{r.k}</div>
              <div className="font-display text-2xl gold-gradient-text">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* -------------------- CHARACTERS -------------------- */
function Characters({
  chars, openChar, setOpenChar,
}: {
  chars: typeof CHARACTERS;
  openChar: number | null;
  setOpenChar: (n: number | null) => void;
}) {
  return (
    <Section id="characters" eyebrow="Chapter II" title="The Family">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chars.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setOpenChar(i)}
            className="group text-left rim-card overflow-hidden transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={800}
                height={1000}
                className="w-full h-full object-cover grayscale-[0.35] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_20%,var(--gold)/0.18,transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="label-caps text-[0.6rem] text-gold">{c.role}</div>
                <div className="font-display text-2xl mt-1 text-foreground">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Played by {c.actor}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {openChar !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 bg-background/80 backdrop-blur-xl animate-fade-up"
          onClick={() => setOpenChar(null)}
        >
          <div
            className="relative max-w-4xl w-full rim-card grain-overlay grid md:grid-cols-2 gap-0 max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={chars[openChar].img}
              alt={chars[openChar].name}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-8 md:p-10 overflow-y-auto">
              <button
                onClick={() => setOpenChar(null)}
                className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center text-gold border border-bronze/60 hover:bg-gold/10"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="label-caps text-gold">{chars[openChar].role}</div>
              <h3 className="font-display text-4xl mt-3 gold-gradient-text">{chars[openChar].name}</h3>
              <div className="text-sm text-muted-foreground mt-1">Portrayed by {chars[openChar].actor}</div>
              <div className="hairline my-6" />
              <p className="text-foreground/80 leading-relaxed">{chars[openChar].bio}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* -------------------- SEASONS -------------------- */
function Seasons({
  seasons, openSeason, setOpenSeason,
}: {
  seasons: typeof SEASONS;
  openSeason: number | null;
  setOpenSeason: (n: number | null) => void;
}) {
  return (
    <Section id="seasons" eyebrow="Chapter III" title="Seasons & Episodes">
      <div className="space-y-3">
        {seasons.map((s, i) => {
          const open = openSeason === i;
          return (
            <div key={s.n} className="rim-card overflow-hidden">
              <button
                onClick={() => setOpenSeason(open ? null : i)}
                className="w-full flex items-center gap-6 p-6 text-left group"
              >
                <div className="font-display text-5xl gold-gradient-text w-20 tabular-nums">
                  0{s.n}
                </div>
                <div className="flex-1">
                  <div className="label-caps text-bronze">{s.year} · {s.eps} Episodes</div>
                  <div className="font-display text-2xl mt-1">{s.title}</div>
                </div>
                <div className={`text-gold text-2xl transition-transform duration-500 ${open ? "rotate-45" : ""}`}>+</div>
              </button>
              <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0 ml-[104px]">
                    <p className="text-foreground/75 max-w-3xl">{s.summary}</p>
                    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                      {Array.from({ length: s.eps }).map((_, e) => (
                        <div key={e} className="border border-bronze/40 px-3 py-2 flex items-center justify-between text-xs">
                          <span className="label-caps text-bronze">Ep {String(e + 1).padStart(2, "0")}</span>
                          <span className="text-gold">▶</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------- TRAILER -------------------- */
function Trailer() {
  const [playing, setPlaying] = useState(false);
  return (
    <Section id="trailer" eyebrow="Chapter IV" title="The Trailer" center>
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_center,var(--gold)/0.18,transparent_70%)] blur-2xl" />
        <div className="relative rim-card grain-overlay aspect-video overflow-hidden">
          <img
            src={gal1}
            alt="Trailer preview"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play trailer"
            >
              <span className="relative flex items-center justify-center h-24 w-24 rounded-full border border-gold/70 bg-background/40 backdrop-blur-md animate-pulse-gold transition-transform group-hover:scale-110">
                <span className="absolute inset-2 rounded-full border border-gold/30" />
                <IconPlayLarge />
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center px-6">
                <div className="label-caps text-gold">Placeholder</div>
                <p className="mt-3 text-muted-foreground max-w-md">
                  Trailer video would embed here. This portfolio site does not ship copyrighted footage.
                </p>
                <button onClick={() => setPlaying(false)} className="btn-ghost mt-6">Close</button>
              </div>
            </div>
          )}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs">
            <span className="label-caps text-bronze">Official Teaser · 02:14</span>
            <span className="label-caps text-bronze">4K · Dolby Atmos</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* -------------------- GALLERY -------------------- */
function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const shots = [
    { src: gal1, caption: "The Foundry" },
    { src: gal2, caption: "Instruments of the Trade" },
    { src: gal3, caption: "The Garrison Bar" },
    { src: gal4, caption: "Small Heath at Dusk" },
    { src: char1, caption: "Portrait — Thomas" },
    { src: char2, caption: "Portrait — Elizabeth" },
  ];
  return (
    <Section id="gallery" eyebrow="Chapter V" title="Gallery">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [grid-auto-rows:180px] md:[grid-auto-rows:220px]">
        {shots.map((s, i) => {
          const layout = ["col-span-2 row-span-2", "", "row-span-2", "", "col-span-2", ""][i] ?? "";
          return (
            <button
              key={i}
              onClick={() => setLightbox(s.src)}
              className={`group relative overflow-hidden rim-card ${layout}`}
            >
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 label-caps text-[0.55rem] text-gold opacity-0 group-hover:opacity-100 transition">
                {s.caption}
              </div>
            </button>
          );
        })}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl animate-fade-up"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full object-contain shadow-[0_0_80px_var(--gold)]" />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 h-11 w-11 flex items-center justify-center text-gold border border-bronze/60"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </Section>
  );
}

/* -------------------- RATINGS -------------------- */
function Ratings() {
  return (
    <Section id="ratings" eyebrow="Chapter VI" title="Critical Reception">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RATINGS.map((r) => (
          <RatingCard key={r.label} {...r} />
        ))}
      </div>
    </Section>
  );
}
function RatingCard({ label, score, fill, suffix }: (typeof RATINGS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((ents) => {
      if (ents[0].isIntersecting) {
        let start = 0;
        const target = score;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          setShown(start + (target - start) * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [score]);

  const C = 2 * Math.PI * 46;
  const dash = (fill / 100) * C;
  return (
    <div ref={ref} className="rim-card grain-overlay p-6 flex flex-col items-center text-center">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--bronze)" strokeOpacity="0.3" strokeWidth="2" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="url(#gold-grad)" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.2,0.7,0.2,1)" }}
          />
          <defs>
            <linearGradient id="gold-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#f5d98a" />
              <stop offset="1" stopColor="#8a6a2a" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-3xl gold-gradient-text tabular-nums">
            {shown.toFixed(suffix === "%" ? 0 : 1)}{suffix ?? ""}
          </div>
        </div>
      </div>
      <div className="mt-5 label-caps text-bronze">{label}</div>
    </div>
  );
}

/* -------------------- REVIEWS -------------------- */
function Reviews({ reviewIdx, setReviewIdx }: { reviewIdx: number; setReviewIdx: (n: number) => void }) {
  const r = REVIEWS[reviewIdx];
  return (
    <Section id="reviews" eyebrow="Chapter VII" title="What They Are Saying">
      <div className="max-w-4xl mx-auto">
        <div className="rim-card grain-overlay p-10 md:p-14 text-center">
          <div className="flex justify-center gap-1 text-gold">
            {Array.from({ length: r.stars }).map((_, i) => <span key={i}>★</span>)}
          </div>
          <blockquote className="mt-8 font-display text-2xl md:text-3xl leading-snug text-foreground/90">
            “{r.text}”
          </blockquote>
          <div className="mt-8 hairline w-16 mx-auto" />
          <div className="mt-6 label-caps text-gold">{r.by}</div>
          <div className="text-xs text-muted-foreground mt-1">{r.role}</div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setReviewIdx((reviewIdx - 1 + REVIEWS.length) % REVIEWS.length)}
            className="h-11 w-11 border border-bronze/60 text-gold hover:bg-gold/10 transition"
            aria-label="Previous review"
          >‹</button>
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIdx(i)}
                className={`h-1 transition-all ${i === reviewIdx ? "w-10 bg-gold" : "w-5 bg-bronze/50"}`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setReviewIdx((reviewIdx + 1) % REVIEWS.length)}
            className="h-11 w-11 border border-bronze/60 text-gold hover:bg-gold/10 transition"
            aria-label="Next review"
          >›</button>
        </div>
      </div>
    </Section>
  );
}

/* -------------------- AWARDS -------------------- */
function Awards() {
  return (
    <Section id="awards" eyebrow="Chapter VIII" title="Awards & Honours">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AWARDS.map((a) => (
          <div key={a.title} className="rim-card p-6 flex items-start gap-5">
            <div className="font-display text-4xl gold-gradient-text w-20 tabular-nums">{a.year}</div>
            <div className="flex-1">
              <div className={`label-caps text-[0.6rem] ${a.tag === "Winner" ? "text-gold" : "text-bronze"}`}>{a.tag}</div>
              <div className="mt-2 text-foreground/90">{a.title}</div>
            </div>
            <div className="text-2xl text-gold/80">✦</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- TIMELINE -------------------- */
function Timeline() {
  return (
    <Section id="timeline" eyebrow="Chapter IX" title="A Family Timeline">
      <div className="relative max-w-3xl mx-auto pl-10 md:pl-0">
        <div className="absolute left-3 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-bronze/60 to-transparent" />
        {TIMELINE.map((t, i) => {
          const left = i % 2 === 0;
          return (
            <div key={t.year} className={`relative mb-10 md:grid md:grid-cols-2 md:gap-10 items-center ${left ? "" : "md:[direction:rtl]"}`}>
              <div className={`md:[direction:ltr] ${left ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                <div className="font-display text-3xl gold-gradient-text">{t.year}</div>
                <p className="mt-2 text-foreground/80">{t.ev}</p>
              </div>
              <div className="hidden md:block" />
              <span className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 bg-gold shadow-[0_0_20px_var(--gold)] animate-pulse-gold" />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------- BEHIND -------------------- */
function Behind() {
  return (
    <Section id="behind" eyebrow="Chapter X" title="Behind the Scenes">
      <div className="grid md:grid-cols-2 gap-5">
        {BEHIND.map((b) => (
          <div key={b.k} className="rim-card grain-overlay p-8 group transition-transform hover:-translate-y-1 duration-500">
            <div className="label-caps text-gold">{b.k}</div>
            <div className="mt-4 hairline w-12" />
            <p className="mt-5 text-foreground/80 leading-relaxed">{b.v}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- SOUNDTRACK -------------------- */
function Soundtrack() {
  return (
    <Section id="soundtrack" eyebrow="Interlude" title="The Score">
      <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <div className="relative mx-auto">
          <div className="relative h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--ink),#111_65%,#000)] shadow-[inset_0_0_40px_#000,0_20px_60px_rgba(0,0,0,0.7)] animate-spin-slow">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute inset-0 rounded-full border border-bronze/20" style={{ transform: `scale(${1 - i * 0.13})` }} />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gold to-bronze shadow-[0_0_30px_var(--gold)]" />
              <div className="absolute h-2 w-2 rounded-full bg-background" />
            </div>
          </div>
          <div className="absolute -inset-6 rounded-full bg-gold/10 blur-3xl -z-10" />
        </div>

        <div>
          <ol className="space-y-3">
            {[
              ["01", "By Order of Peaky", "Nick Cave & The Bad Seeds — 4:12"],
              ["02", "Red Right Hand (Reprise)", "The Ensemble — 3:48"],
              ["03", "Coal & Cinder", "Anna Calvi — 5:02"],
              ["04", "Small Heath Sonata", "Original Score — 6:20"],
              ["05", "The Iron Verdict", "Original Score — 4:37"],
            ].map(([n, t, m]) => (
              <li key={n} className="group flex items-center gap-5 p-4 border-b border-border hover:bg-gold/[0.03] transition">
                <span className="label-caps text-bronze w-8">{n}</span>
                <div className="flex-1">
                  <div className="text-foreground/95">{t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m}</div>
                </div>
                <div className="flex items-end gap-[3px] h-8">
                  {[6, 12, 20, 14, 24, 10, 18, 8].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] bg-gold/60 animate-wave"
                      style={{ height: h, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
                <button className="h-9 w-9 border border-bronze/60 text-gold group-hover:bg-gold/10 transition" aria-label="Play track">▶</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* -------------------- FAQ -------------------- */
function Faq({ faqOpen, setFaqOpen }: { faqOpen: number | null; setFaqOpen: (n: number | null) => void }) {
  return (
    <Section id="faq" eyebrow="Chapter XI" title="Frequently Asked">
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ.map((f, i) => {
          const open = faqOpen === i;
          return (
            <div key={f.q} className="rim-card">
              <button
                onClick={() => setFaqOpen(open ? null : i)}
                className="w-full flex items-center justify-between gap-6 p-6 text-left"
              >
                <span className="font-display text-lg md:text-xl">{f.q}</span>
                <span className={`text-gold text-xl transition-transform duration-500 ${open ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-foreground/75 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------- NEWSLETTER -------------------- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setErr("A proper address, if you please."); return; }
    setErr(""); setSent(true);
  };
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <p className="label-caps text-gold">Dispatches</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">Join the Garrison</h2>
        <p className="mt-4 text-muted-foreground">
          Occasional dispatches from Small Heath. No spam. No informers.
        </p>
        <form onSubmit={submit} className="mt-10 rim-card grain-overlay p-2 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErr(""); }}
            placeholder="your.name@birmingham.co.uk"
            className="flex-1 bg-transparent px-5 py-4 outline-none placeholder:text-muted-foreground/60 text-foreground"
          />
          <button type="submit" className="btn-gold justify-center">
            {sent ? "✓ Subscribed" : "Subscribe"}
          </button>
        </form>
        {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
        {sent && <p className="mt-3 text-sm text-gold animate-fade-up">By order — you are on the list.</p>}
      </div>
    </section>
  );
}

/* -------------------- CONTACT -------------------- */
function Contact() {
  return (
    <Section id="contact" eyebrow="Chapter XII" title="Correspondence">
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { k: "Offices", v: "Watery Lane, Small Heath\nBirmingham, B10" },
          { k: "Press", v: "press@shelbyandco.example\n+44 (0)121 000 0000" },
          { k: "General", v: "hello@shelbyandco.example\nMon — Sat · 09:00 — 18:00" },
        ].map((c) => (
          <div key={c.k} className="rim-card grain-overlay p-8">
            <div className="label-caps text-gold">{c.k}</div>
            <div className="mt-4 hairline w-10" />
            <p className="mt-5 whitespace-pre-line text-foreground/85 leading-relaxed">{c.v}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------- FOOTER -------------------- */
function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(ellipse_at_bottom,var(--gold)/0.1,transparent_60%)]" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <RazorMark />
            <div className="font-display text-2xl gold-gradient-text">Shelby &amp; Co</div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A cinematic portfolio concept inspired by the atmosphere of 1920s industrial Birmingham.
            Not affiliated with any studio, network, or existing production.
          </p>
        </div>
        <div>
          <div className="label-caps text-bronze mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            {NAV.slice(1, 7).map(([id, l]) => (
              <li key={id}><a href={`#${id}`} className="text-foreground/80 hover:text-gold transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="label-caps text-bronze mb-4">Follow</div>
          <ul className="space-y-2 text-sm">
            {["Instagram", "X / Twitter", "YouTube", "Letterboxd"].map((s) => (
              <li key={s}><a href="#" className="text-foreground/80 hover:text-gold transition">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Shelby &amp; Co. · Portfolio Concept</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- PRIMITIVES -------------------- */
function Section({
  id, eyebrow, title, children, center,
}: {
  id: string; eyebrow: string; title: string; children: React.ReactNode; center?: boolean;
}) {
  return (
    <section id={id} className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <header className={`mb-14 ${center ? "text-center" : ""}`}>
          <p className="label-caps text-gold">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[1.05]">{title}</h2>
          <div className={`mt-6 hairline w-24 ${center ? "mx-auto" : ""}`} />
        </header>
        {children}
      </div>
    </section>
  );
}

function RazorMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-gold" aria-hidden>
      <defs>
        <linearGradient id="rm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f5d98a" />
          <stop offset="1" stopColor="#8a6a2a" />
        </linearGradient>
      </defs>
      <path d="M20 3 L34 12 L34 22 C34 30 27 35 20 37 C13 35 6 30 6 22 L6 12 Z"
        fill="none" stroke="url(#rm)" strokeWidth="1.5" />
      <path d="M14 14 L26 14 L23 22 L17 22 Z" fill="url(#rm)" opacity="0.9" />
      <circle cx="20" cy="27" r="1.5" fill="url(#rm)" />
    </svg>
  );
}
function IconPlay() { return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>; }
function IconPlayLarge() { return <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold ml-1" fill="currentColor"><path d="M6 4l14 8-14 8z" /></svg>; }
function IconArrow() { return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
function IconMute() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 9v6h4l5 4V5L8 9H4zM17 9l4 6M21 9l-4 6" /></svg>; }
function IconSound() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 9v6h4l5 4V5L8 9H4zM17 8a5 5 0 010 8M20 5a9 9 0 010 14" /></svg>; }
