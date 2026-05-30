'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoReviewCard } from '@/components/VideoReviewCard';
import { EnrollmentSection } from '@/components/EnrollmentSection';
import { WHATSAPP_DEFAULT, TELEGRAM_DEFAULT, enrollLinks } from '@/lib/contact-links';

const WA_RESERVE = enrollLinks('reserve').whatsapp;

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Enroll',     id: 'enroll'     },
  { label: 'Journey',    id: 'journey'    },
  { label: 'Curriculum', id: 'mentorship' },
  { label: 'Bonuses',    id: 'bonuses'    },
  { label: 'Reviews',    id: 'reviews'    },
  { label: 'Community',  id: 'community'  },
  { label: 'Contact',    id: 'contact'    },
];

const STATS = [
  { value: 4,   suffix: '+', label: 'Years Trading'    },
  { value: 250, suffix: '+', label: 'Students Trained' },
  { value: 15,  suffix: '',  label: 'Live Sessions'    },
  { value: 5,   suffix: '',  label: 'Weeks Intensive'  },
];

const TICKER = [
  '✦ JUNE 2026 batch starts 8 June — only 10 seats left',
  '✦ Reserve your seat with just ₹2,000 on UPI',
  '✦ Arjun passed his first prop-firm challenge',
  '✦ 250+ traders trained across 5+ batches',
  '✦ 100% live classes + session recordings',
  '✦ Priya hit consistent green months after Batch 4',
  '✦ Batch 6 now enrolling — only 25 spots',
  '✦ Rohan went from blown accounts to funded trader',
  '✦ Small batches of 10–25 for personal attention',
  '✦ Sneha doubled her account in 3 months post-batch',
];

const FOR_WHO = [
  'Complete beginners who want to start right — not rebuild bad habits later',
  'Struggling traders tired of random strategies and blown accounts',
  'Busy professionals who want a proven, repeatable system',
  'Anyone serious about treating trading like a business, not a gamble',
];

const NOT_FOR_WHO = [
  'People looking for get-rich-quick signals or copy-trading bots',
  'Those unwilling to commit to 5 weeks of focused learning',
  'Traders who want shortcuts instead of sustainable skill-building',
];

const WEEKS = [
  {
    week: 'Week 1', theme: 'Foundation Reset',
    tagline: '"Before We Touch the Charts, We Rebuild the Trader"',
    color: 'emerald',
    sessions: [
      { num: 1, title: 'Foundation Reset + Expectations Setup',
        points: ['Break the biggest myths keeping traders stuck', 'Show what actually makes a profitable trader', 'Train you like a gym, not a hype seminar'],
        outcome: 'Clarity. Confidence. Emotional Reset.' },
      { num: 2, title: 'Market Basics — Understanding the Forex',
        points: ['Understand what forex really is (a $7 trillion market)', 'Learn who moves the market and how retailers get trapped', 'Break down currency pairs, spreads, and correlations', "Discover why some pairs move fast and others don't"],
        outcome: 'Build a solid foundation in market structure.' },
      { num: 3, title: 'Market Maths',
        points: ['Master pip, lot size & risk calculation like a pro', 'Learn why Risk:Reward beats win-rate', 'Find your trader type based on time, lifestyle & psychology', 'Align your strategy with market sessions & liquidity flow'],
        outcome: 'Turn from an emotional trader into a calculated one.' },
    ],
  },
  {
    week: 'Week 2', theme: 'Price Action Decoded',
    tagline: '"Trade What You See, Not What You Feel."',
    color: 'blue',
    sessions: [
      { num: 4, title: 'Candlesticks — Your First Language of the Market',
        points: ['Understand how candles are formed and what they really mean', "Read candle strength & psychology: who's in control?", 'Filter out noise from real signals', 'Spot single vs combo patterns that actually matter'],
        outcome: "No more guessing — just reading the market's mood in real-time." },
      { num: 5, title: 'Market Structure — Spotting Trends Like a Bank',
        points: ['Master trend types: impulsive, corrective, clean, choppy', 'Identify real Break of Structure (BOS)', 'Mark swing highs/lows with precision', 'Create entry zones using pure price action'],
        outcome: 'Build a solid foundation in market structure.' },
      { num: 6, title: 'Trend Reversals — Ride the Shift, Not the Trap',
        points: ['Understand the psychology behind real trend reversals', 'Mark fresh market structure after confirmed reversals', 'Build high-probability reversal entry zones for early, safe trades'],
        outcome: 'Stop being the trader who buys at the top or sells at the bottom.' },
    ],
  },
  {
    week: 'Week 3', theme: 'The Entry Blueprint',
    tagline: '"One Entry Model. Infinite Consistency."',
    color: 'violet',
    sessions: [
      { num: 7, title: 'Internal Market Structure & Fake CHoCH',
        points: ['Understand what internal structure is and why most traders overlook it', 'Master the Fake CHoCH (Change of Character) entry model', 'Spot entries while others wait for confirmation'],
        outcome: 'Gain the confidence to execute trades in real-time using smart strategies.' },
      { num: 8, title: 'Top-Down Analysis — Aligning Multi-Timeframe Bias',
        points: ['Master Top-Down Analysis from Weekly to Intraday', 'Align structure, liquidity, and entry models across timeframes', 'Frame high-probability setups from higher timeframe zones'],
        outcome: 'Think like an institutional analyst — conviction, precision, and consistency.' },
      { num: 9, title: 'Trading Tools & Smart Indicator Usage',
        points: ['Read market sessions effectively using LuxAlgo tools', 'Spot RSI divergences with structure to confirm reversal setups', 'Use the Currency Strength Meter for added confluence', 'Plot Fibonacci retracements to target sniper entry zones'],
        outcome: 'Master a few tools like a pro to refine your trading strategy.' },
    ],
  },
  {
    week: 'Week 4', theme: 'Smart Money Concepts',
    tagline: '"Trade With the Banks, Not Against Them."',
    color: 'amber',
    sessions: [
      { num: 10, title: 'SMC Fundamentals — Understand The Institutional Blueprint',
        points: ['Understand Smart Money Concepts (SMC) and why they reflect institutional behavior', 'Identify Supply & Demand Zones, Order Blocks, and Fair Value Gaps (FVGs)', 'Differentiate real market intent from retail traps like support/resistance and inducements'],
        outcome: 'Start spotting trades before retail traders even react.' },
      { num: 11, title: 'Liquidity Masterclass — Where the Money Hides',
        points: ['Understand liquidity as the driving force behind all price moves', 'Identify key liquidity types: equal highs/lows, trendlines, session highs/lows', 'Spot the difference between liquidity sweeps and grabs to avoid traps'],
        outcome: 'Develop a sniper entry style based on trap and trigger logic.' },
      { num: 12, title: 'Trendlines & Trendline Liquidity — Trap and Reverse',
        points: ['Understand how institutions exploit trendlines for liquidity traps', 'Learn to spot and trade fakeouts using trendline liquidity strategy', 'Mark clean, institution-level trendlines with precision'],
        outcome: 'Transform from falling for trendline fakeouts to profiting from them.' },
    ],
  },
  {
    week: 'Week 5', theme: 'Trader Evolution',
    tagline: '"Master the Unseen Side of Trading."',
    color: 'rose',
    sessions: [
      { num: 13, title: 'Fundamentals — Trading News with Logic, Not Panic',
        points: ['Learn how global news impacts price action — without tracking 10 websites', 'Use a simple 3-step checklist for high-impact news days', 'Understand reactions to NFP, CPI, interest rates & FOMC'],
        outcome: 'Stop fearing news and start trading it with logic.' },
      { num: 14, title: 'Risk Management + Trading Plan — Trade Like a Business',
        points: ['Build a personalized risk plan based on your capital, style, and psychology', 'Create a trading plan that fits your routine and mindset', 'Use a journal to track performance and improve decision-making'],
        outcome: 'Leave with a trusted plan that guides you — even on challenging days.' },
      { num: 15, title: 'Psychology — Building The Trader Within',
        points: ['Identify emotional triggers using simple reflection frameworks', 'Use proven systems to eliminate fear, FOMO, and revenge trading', 'Apply practical tasks and a cheat sheet to rewire trading behavior'],
        outcome: 'Ensure your strategy remains intact even when emotions arise.' },
    ],
  },
];

const BONUSES = [
  { icon: '👥', color: 'emerald', title: 'Private Trader Community',         desc: 'Lifetime access to an exclusive trader community for ongoing support and accountability.' },
  { icon: '🧠', color: 'cyan',    title: 'Trading Psychology Cheat Sheet',   desc: 'A ready-to-use reference card to keep your mindset sharp during every trading session.' },
  { icon: '📒', color: 'violet',  title: 'Personalized Trading Journal',      desc: 'A structured journal template to track trades, emotions, and performance for continuous growth.' },
  { icon: '📊', color: 'amber',   title: 'VIP Analysis Group',               desc: 'Get access to real-time market analysis and pre-market setups from Ritu directly.' },
  { icon: '🎙️', color: 'rose',   title: 'Live Q&A Webinars',                desc: 'Weekly and monthly live sessions to get your questions answered in real time.' },
  { icon: '🏕️', color: 'teal',   title: 'Offline Bootcamps & Meetups',      desc: 'In-person events for hands-on learning, networking, and community building.' },
];

const VIDEO_REVIEWS = [
  {
    name: 'Manpreet Singh',
    role: 'FX:Rich Graduate · Batch Alumni',
    src: process.env.NEXT_PUBLIC_VIDEO_REVIEW_1 ?? '/videos/review-1.mp4',
    poster: process.env.NEXT_PUBLIC_POSTER_REVIEW_1 ?? '/videos/review-1-poster.webp',
  },
  {
    name: 'Janhavi ',
    role: 'FX:Rich Graduate · Batch Alumni',
    src: process.env.NEXT_PUBLIC_VIDEO_REVIEW_2 ?? '/videos/review-2.mp4',
    poster: process.env.NEXT_PUBLIC_POSTER_REVIEW_2 ?? '/videos/review-2-poster.webp',
  },
] as const;

const REVIEWS = [
  { name: 'Arjun Mehta',     role: 'IT Professional, Mumbai',   stars: 5,
    text: "Before joining FX:Rich, I had blown two accounts chasing random signals. Ritu's structured approach completely changed how I see the market. Week 2 alone — just the market structure sessions — was worth everything. I passed my first prop-firm challenge 3 weeks after the batch ended." },
  { name: 'Priya Sharma',    role: 'Freelancer, Pune',           stars: 5,
    text: "I was skeptical at first — I'd tried other courses before. But this was different. Live classes, real charts, real answers to real questions. The risk management session hit different. I finally trade with a plan instead of hoping. My account has been consistently green for 2 months." },
  { name: 'Rohan Desai',     role: 'College Student, Nashik',    stars: 5,
    text: "As a beginner with zero background, I was worried I'd be lost. But Ritu breaks everything down so clearly. The SMC and liquidity sessions blew my mind — I never knew the market worked this way. The community is also super active and helpful even after the batch ended." },
  { name: 'Sneha Kulkarni',  role: 'Teacher, Nagpur',            stars: 5,
    text: "Trading always felt intimidating to me. The psychology and risk management weeks helped me more than any YouTube video ever did. I now have a proper trading journal and actually stick to my plan. Ritu genuinely cares about every student's progress." },
  { name: 'Karan Joshi',     role: 'Business Owner, Surat',      stars: 5,
    text: "The batch size is small and that makes a huge difference. Ritu remembered every student's trading style by Week 3. The VIP analysis group she shares before market open is gold. Worth every rupee — I've already referred two friends." },
  { name: 'Ananya Patil',    role: 'CA Aspirant, Bengaluru',     stars: 5,
    text: "I joined mid-batch after a friend recommended it and Ritu made sure I caught up on everything. The fake CHoCH entry model is now my go-to setup. Consistently hitting 1:2 R:R on my trades. Can't wait for the next offline bootcamp." },
];

const JOURNEY = [
  { year: 'Year 1 — 2021', title: 'The Humbling Start',
    text: "Started trading forex with zero structure — chasing signals from Telegram groups, copying random trades, and completely ignoring risk management. Two accounts blown. Each loss felt personal. But those blowups forced a hard look at the truth: it wasn't the market's fault." },
  { year: 'Year 2 — 2022', title: 'The Reset & Rebuild',
    text: "Stopped looking for shortcuts. Went back to basics — pure price action, candlestick psychology, market structure. Six months of intensive chart study, journaling every trade, and rewiring the mindset. Slowly, patterns started making sense. Losses became lessons, not disasters." },
  { year: 'Year 3 — 2023', title: 'Smart Money & Consistency',
    text: "Discovered Smart Money Concepts — Order Blocks, Fair Value Gaps, liquidity traps. Everything clicked. The market was no longer random noise; it had institutional logic. Built a repeatable entry model and started hitting consistency for the first time. Passed first prop-firm challenge." },
  { year: 'Year 4 — 2024–Present', title: 'Teaching & Transforming 250+ Traders',
    text: "Launched FX:Rich Traders to pass on everything learned the hard way. 250+ students trained across multiple batches. The mission: give every student the structured system, mindset framework, and real-market skills that took 4 years to build — compressed into 5 weeks." },
];

// ─── Color Maps ───────────────────────────────────────────────────────────────

const C: Record<string, { border: string; text: string; bg: string; badge: string; dot: string; glow: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-500',    glow: 'hover:shadow-emerald-500/15' },
  blue:    { border: 'border-blue-500/30',    text: 'text-blue-400',    bg: 'bg-blue-500/10',    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25',         dot: 'bg-blue-500',       glow: 'hover:shadow-blue-500/15'    },
  violet:  { border: 'border-violet-500/30',  text: 'text-violet-400',  bg: 'bg-violet-500/10',  badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25',   dot: 'bg-violet-500',     glow: 'hover:shadow-violet-500/15'  },
  amber:   { border: 'border-amber-500/30',   text: 'text-amber-400',   bg: 'bg-amber-500/10',   badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25',      dot: 'bg-amber-500',      glow: 'hover:shadow-amber-500/15'   },
  rose:    { border: 'border-rose-500/30',    text: 'text-rose-400',    bg: 'bg-rose-500/10',    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/25',         dot: 'bg-rose-500',       glow: 'hover:shadow-rose-500/15'    },
  cyan:    { border: 'border-cyan-500/30',    text: 'text-cyan-400',    bg: 'bg-cyan-500/10',    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',         dot: 'bg-cyan-500',       glow: 'hover:shadow-cyan-500/15'    },
  teal:    { border: 'border-teal-500/30',    text: 'text-teal-400',    bg: 'bg-teal-500/10',    badge: 'bg-teal-500/15 text-teal-400 border-teal-500/25',         dot: 'bg-teal-500',       glow: 'hover:shadow-teal-500/15'    },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

// ─── Small components ─────────────────────────────────────────────────────────

function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Fade className="text-center mb-10 sm:mb-14 px-1">
      <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-400 mb-3">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">{title}</h2>
      {sub && <p className="mt-3 sm:mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">{sub}</p>}
    </Fade>
  );
}

function StatBadge({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center py-5 px-4 bg-gray-900/70 backdrop-blur-sm">
      <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-500">
        {count}{suffix}
      </span>
      <span className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

function MarqueeTicker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y border-gray-800/60 bg-gray-950/60 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-10 text-xs font-medium text-gray-500">
            <span className="text-emerald-500 text-[10px]">●</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── WeekCard ─────────────────────────────────────────────────────────────────

function WeekCard({ data, index }: { data: typeof WEEKS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const c = C[data.color] ?? C.emerald;

  return (
    <Fade delay={index * 80}>
      <div className={`rounded-2xl bg-gray-900/80 backdrop-blur border ${c.border} transition-all duration-300 hover:shadow-2xl ${c.glow} overflow-hidden`}>
        <button className="w-full text-left p-5 sm:p-6 flex items-center gap-4 group" onClick={() => setOpen(o => !o)}>
          <div className={`shrink-0 w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
            <span className={`text-xs font-black ${c.text}`}>W{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${c.badge}`}>{data.week}</span>
              <span className="text-gray-700 text-xs hidden sm:inline">· {data.sessions.length} sessions</span>
            </div>
            <h3 className={`font-extrabold text-white text-base sm:text-lg mt-0.5 group-hover:${c.text} transition-colors`}>{data.theme}</h3>
            <p className="text-gray-500 text-xs mt-0.5 italic truncate hidden sm:block">{data.tagline}</p>
          </div>
          <div className={`shrink-0 w-8 h-8 rounded-full ${c.bg} border ${c.border} flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            <svg className={`w-3.5 h-3.5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`px-5 sm:px-6 pb-6 border-t ${c.border} pt-5 grid sm:grid-cols-3 gap-4`}>
            {data.sessions.map(s => (
              <div key={s.num} className="rounded-xl bg-gray-800/50 border border-gray-700/40 p-4 flex flex-col hover:border-gray-600/60 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-5 h-5 rounded-full ${c.dot} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>{s.num}</span>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">Session {s.num}</p>
                </div>
                <h4 className="font-bold text-white text-sm leading-snug mb-3">{s.title}</h4>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {s.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                      <span className={`shrink-0 mt-0.5 ${c.text}`}>›</span>{pt}
                    </li>
                  ))}
                </ul>
                <div className={`rounded-lg ${c.bg} border ${c.border} px-3 py-2`}>
                  <p className="text-[11px] leading-snug">
                    <span className={`font-semibold ${c.text}`}>↳ </span>
                    <span className="text-gray-400">{s.outcome}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const statsRef  = useRef<HTMLDivElement>(null);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ════ NAVBAR ════ */}
      <header className={`fixed top-0 inset-x-0 z-50 safe-top transition-all duration-300 ${
        scrolled ? 'bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/70 shadow-xl shadow-black/40' : 'bg-transparent'
      }`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2">
          <button onClick={() => scrollTo('hero')} className="touch-target text-lg sm:text-xl font-extrabold tracking-tight -ml-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 animate-gradient">FX:Rich</span>
            <span className="hidden sm:inline text-gray-600 font-normal text-sm ml-2">Traders</span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button onClick={() => scrollTo(link.id)} className="text-sm text-gray-400 hover:text-white transition-colors font-medium relative group">
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo('enroll')}
            className="hidden md:inline-flex rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 px-5 py-2 text-sm font-bold text-gray-950 hover:brightness-110 transition-all animate-glow"
          >
            Enroll Now
          </button>

          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="md:hidden touch-target text-gray-400 hover:text-white p-2 -mr-1" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-xl border-b border-gray-800 px-4 py-4 flex flex-col gap-1 max-h-[min(70vh,480px)] overflow-y-auto overscroll-contain">
            {NAV_LINKS.map(link => (
              <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className="touch-target text-left text-gray-300 hover:text-emerald-400 transition-colors font-medium py-3 px-2 rounded-lg active:bg-gray-800/80">
                {link.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollTo('enroll')} className="touch-target rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 py-3.5 text-sm font-bold text-gray-950 text-center mt-2">
              Enroll — June Batch
            </button>
          </div>
        )}
      </header>

      <main className="overflow-x-hidden bg-gray-950 main-pad-mobile md:pb-0">

        {/* ════ HERO ════ */}
        <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-[calc(3.5rem+env(safe-area-inset-top))] sm:pt-16 pb-24 sm:pb-8 overflow-hidden">

          {/* Floating gradient orbs — smaller on phones */}
          <div className="absolute top-1/4 left-1/4 w-[min(90vw,500px)] h-[min(90vw,500px)] rounded-full bg-emerald-500/8 blur-[80px] sm:blur-[120px] animate-float-a pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[min(70vw,400px)] h-[min(70vw,400px)] rounded-full bg-cyan-500/6 blur-[70px] sm:blur-[100px] animate-float-b pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[min(60vw,350px)] h-[min(60vw,350px)] rounded-full bg-teal-500/5 blur-[60px] sm:blur-[90px] animate-float-c pointer-events-none" />

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />

          {/* Decorative ring — desktop only (avoids horizontal scroll on phones) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-emerald-500/5 animate-spin-slow pointer-events-none" />
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-emerald-500/3 pointer-events-none" />

          <div className="relative z-10 max-w-4xl w-full">
            {/* Live badge */}
            <Fade>
              <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6 max-w-[95vw] rounded-full border border-amber-500/30 bg-amber-500/8 px-3 sm:px-4 py-1.5 text-[11px] sm:text-sm font-semibold text-amber-400 tracking-wide animate-shimmer">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="sm:hidden">June Batch · 8 June · 10 Seats</span>
                <span className="hidden sm:inline">June 2026 Batch · Starts 8 June · Only 10 Seats</span>
              </div>
            </Fade>

            <Fade delay={100}>
              <h1 className="text-[1.75rem] leading-[1.12] min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                Transform Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-gradient">
                  Mindset, Skillset
                </span>
                <br />& Confidence
              </h1>
            </Fade>

            <Fade delay={200}>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-1">
                This isn&apos;t just a mentorship — it&apos;s a{' '}
                <strong className="text-white">5-week journey</strong> to become the trader
                you were meant to be. Live classes, real markets, proven strategy by Rithuu&apos;s FX:Rich Traders.
              </p>
            </Fade>

            <Fade delay={300}>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto">
                <button
                  type="button"
                  onClick={() => scrollTo('enroll')}
                  className="touch-target w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-6 sm:px-9 py-3.5 sm:py-4 font-bold text-gray-950 hover:brightness-110 active:scale-[0.98] sm:hover:scale-105 transition-all shadow-2xl shadow-amber-500/25 animate-glow"
                >
                  Enroll — June Batch →
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('mentorship')}
                  className="touch-target w-full sm:w-auto rounded-xl border border-gray-700 px-6 sm:px-9 py-3.5 sm:py-4 font-semibold text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 active:bg-emerald-500/10 transition-all"
                >
                  View Curriculum
                </button>
              </div>
            </Fade>

            {/* Stats grid with counter */}
            <Fade delay={400}>
              <div ref={statsRef} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-800/50 card-gradient-border">
                {STATS.map((s, i) => (
                  <StatBadge key={i} value={s.value} suffix={s.suffix} label={s.label} active={statsOn} />
                ))}
              </div>
            </Fade>
          </div>

          <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Ticker */}
        <MarqueeTicker />

        {/* ════ JUNE ENROLLMENT ════ */}
        <EnrollmentSection />

        {/* ════ MENTORSHIP STRUCTURE ════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-900/40 border-b border-gray-800/50">
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="How It Works" title={<>Mentorship Structure <span className="text-emerald-400">&amp; Format</span></>} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '⏳', label: 'Course Duration',       value: '5 Weeks of Intensive Learning',                         color: 'emerald' },
                { icon: '🎥', label: 'Live-Only Experience',  value: '100% Live Classes — No Pre-recorded Sessions',           color: 'cyan'    },
                { icon: '💻', label: 'Platform',              value: 'Sessions Conducted via Zoom',                            color: 'violet'  },
                { icon: '⏺️', label: 'Session Recordings',   value: 'Available for Limited Time (revision only)',              color: 'amber'   },
                { icon: '👥', label: 'June Batch Size',       value: 'Only 10 Seats — Personal Attention Guaranteed',          color: 'rose'    },
                { icon: '📅', label: 'Total Sessions',        value: '15 Live Sessions across 5 Weeks',                        color: 'teal'    },
              ].map((item, i) => {
                const c = C[item.color] ?? C.emerald;
                return (
                  <Fade key={item.label} delay={i * 60}>
                    <div className={`rounded-xl bg-gray-900 border ${c.border} p-5 flex gap-4 items-start hover:shadow-xl ${c.glow} hover:-translate-y-0.5 transition-all duration-300 card-gradient-border`}>
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl shrink-0`}>{item.icon}</div>
                      <div>
                        <p className={`text-[11px] font-bold ${c.text} uppercase tracking-widest mb-1`}>{item.label}</p>
                        <p className="text-sm text-gray-300 leading-snug">{item.value}</p>
                      </div>
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════ IS THIS FOR YOU? ════ */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader eyebrow="Who It's For" title={<>Is This <span className="text-emerald-400">Right For You?</span></>} />
            <div className="grid md:grid-cols-2 gap-6">
              <Fade delay={0}>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/8 to-teal-500/5 border border-emerald-500/20 p-7 h-full card-gradient-border">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-white">This IS for you if…</h3>
                  </div>
                  <ul className="space-y-3">
                    {FOR_WHO.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>

              <Fade delay={120}>
                <div className="rounded-2xl bg-gradient-to-br from-red-500/6 to-rose-500/3 border border-red-500/15 p-7 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="font-extrabold text-white">This is NOT for you if…</h3>
                  </div>
                  <ul className="space-y-3">
                    {NOT_FOR_WHO.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                        <span className="text-red-400 font-bold shrink-0 mt-0.5">✗</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-red-500/10">
                    <p className="text-sm text-gray-500 italic">This mentorship is built for traders who are willing to commit, learn, and build something real.</p>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* ════ JOURNEY ════ */}
        <section id="journey" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900/40 border-y border-gray-800/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-[130px] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHeader
              eyebrow="The Mentor's Story"
              title={<>4 Years. Real Losses. <span className="text-emerald-400">Real Transformation.</span></>}
              sub="Ritu's journey to becoming a consistent, funded forex trader — and everything she learned along the way."
            />

            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <Fade className="order-last lg:order-first">
                <div className="relative">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-700/60 card-gradient-border bg-gray-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ritu.png"
                      alt="Ritu, founder of FX:Rich Traders"
                      className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
                    <svg className="absolute bottom-0 left-0 right-0 w-full text-emerald-500/50 pointer-events-none" height="80" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden>
                      <polyline points="0,70 60,52 130,58 190,28 250,38 310,14 360,22 400,8" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 font-bold text-sm rounded-2xl px-5 py-3 shadow-2xl shadow-emerald-500/40">
                    ✓ Funded Trader · 250+ Students
                  </div>
                </div>
              </Fade>

              <div className="space-y-0">
                {JOURNEY.map((item, i) => (
                  <Fade key={i} delay={i * 100}>
                    <div className="relative flex gap-5 pb-8 last:pb-0">
                      {i < JOURNEY.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 to-transparent" />
                      )}
                      <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mt-0.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-10" />
                        <span className="text-emerald-400 font-extrabold text-xs">{i + 1}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">{item.year}</span>
                        <h3 className="mt-1 font-bold text-white text-base">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </Fade>
                ))}

                <Fade delay={400}>
                  <div className="mt-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-5 card-gradient-border">
                    <p className="text-emerald-300 text-sm leading-relaxed italic">
                      &ldquo;You don&apos;t need more information... you need transformation. Everything I teach, I learned the hard way — so you don&apos;t have to.&rdquo;
                    </p>
                    <p className="mt-2 text-xs text-emerald-500 font-bold">— Ritu, Founder · FX:Rich Traders</p>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </section>

        {/* ════ CURRICULUM ════ */}
        <section id="mentorship" className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              eyebrow="Curriculum"
              title={<>Forex Mastery <span className="text-emerald-400">2025</span></>}
              sub="15 live sessions. 5 weeks. One complete system — mindset, strategy, psychology, and risk management."
            />

            {/* Week progress dots */}
            <Fade>
              <div className="flex items-center justify-center gap-2 mb-8">
                {WEEKS.map((w, i) => {
                  const c = C[w.color] ?? C.emerald;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${c.dot} shadow-lg`} style={{ boxShadow: `0 0 8px 2px var(--tw-shadow-color)` }} />
                      {i < WEEKS.length - 1 && <div className="w-8 h-px bg-gradient-to-r from-gray-700 to-gray-800" />}
                    </div>
                  );
                })}
              </div>
            </Fade>

            <div className="space-y-3">
              {WEEKS.map((week, i) => <WeekCard key={week.week} data={week} index={i} />)}
            </div>

            <Fade className="mt-12">
              <div className="rounded-2xl bg-gradient-to-br from-emerald-900/20 via-gray-900 to-teal-900/15 border border-emerald-500/20 p-8 text-center card-gradient-border">
                <h3 className="text-2xl font-extrabold text-white mb-2">This Mentorship Gives You:</h3>
                <p className="text-gray-500 text-sm mb-8">Everything you need to trade with confidence — nothing you don&apos;t.</p>
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: '🧭', text: 'A complete system — mindset, strategy, psychology, and risk management' },
                    { icon: '🤝', text: 'Live support, real-time execution, and community accountability' },
                    { icon: '💎', text: 'A trading identity built on confidence, not confusion' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start rounded-xl bg-black/30 border border-emerald-500/10 p-4 text-left">
                      <span className="text-xl shrink-0">{item.icon}</span>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-5">
                  Your next 5 weeks can change your next 5 years.
                </p>
                <button
                  onClick={() => scrollTo('enroll')}
                  className="inline-flex rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-3.5 font-bold text-gray-950 hover:brightness-110 transition-all hover:scale-105 shadow-xl shadow-emerald-500/25 animate-glow"
                >
                  Enroll — June Batch →
                </button>
              </div>
            </Fade>
          </div>
        </section>

        {/* ════ BONUSES ════ */}
        <section id="bonuses" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900/40 border-y border-gray-800/50 relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeader
              eyebrow="Exclusive Bonuses"
              title={<>Everything You&apos;ll Receive <span className="text-emerald-400">Inside</span></>}
              sub="Beyond the 15 sessions — the tools, resources, and community that keep you growing long after the 5 weeks end."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BONUSES.map((bonus, i) => {
                const c = C[bonus.color] ?? C.emerald;
                return (
                  <Fade key={bonus.title} delay={i * 70}>
                    <div className={`group rounded-2xl bg-gray-900 border ${c.border} p-6 hover:shadow-2xl ${c.glow} hover:-translate-y-1 transition-all duration-300 card-gradient-border h-full`}>
                      <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                        {bonus.icon}
                      </div>
                      <div className={`inline-block text-[10px] font-bold uppercase tracking-widest ${c.text} mb-2`}>Included</div>
                      <h3 className="font-bold text-white text-base leading-snug">{bonus.title}</h3>
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{bonus.desc}</p>
                    </div>
                  </Fade>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════ REVIEWS ════ */}
        <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Student Reviews"
              title={<>Real Traders, <span className="text-emerald-400">Real Results</span></>}
              sub="250+ students trained across multiple batches — hear from them on video and in their own words."
            />

            {/* Video testimonials — lazy-loaded; no download until play */}
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
              {VIDEO_REVIEWS.map((video, i) => (
                <Fade key={i} delay={i * 100}>
                  <VideoReviewCard {...video} />
                </Fade>
              ))}
            </div>

            <Fade className="mb-8">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Written reviews
              </p>
            </Fade>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {REVIEWS.map((review, i) => (
                <Fade key={i} delay={i * 60} className="break-inside-avoid">
                  <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300 card-gradient-border">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.stars }).map((_, s) => (
                        <svg key={s} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-5">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <span className="text-emerald-300 font-bold text-sm">{review.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-none">{review.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Summary bar */}
            <Fade className="mt-12">
              <div className="rounded-2xl bg-gradient-to-r from-gray-900 via-emerald-900/10 to-gray-900 border border-emerald-500/15 p-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:divide-x divide-gray-800">
                {[
                  { value: '250+', label: 'Students Trained' },
                  { value: '5 ★', label: 'Average Rating'   },
                  { value: '5+',  label: 'Batches Completed'},
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center sm:px-8">
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{stat.value}</span>
                    <span className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* ════ COMMUNITY ════ */}
        <section id="community" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900/40 border-y border-gray-800/50">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              eyebrow="Community"
              title={<>Join Traders Who <span className="text-emerald-400">Actually Trade</span></>}
              sub="Real-time analysis, pre-market setups, and a no-BS community. No paid signals — just education, accountability, and growth."
            />

            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                { icon: '📊', title: 'Daily Analysis',   desc: 'Real market breakdowns posted every trading day before the session opens.',                 color: 'emerald' },
                { icon: '🎯', title: 'Trade Setups',     desc: 'Pre-market and live setups with clear entry, stop-loss, and take-profit levels.',           color: 'cyan'    },
                { icon: '🧠', title: 'Mindset Content',  desc: "Trader psychology posts to keep you disciplined when markets get emotional.",               color: 'violet'  },
              ].map((item, i) => {
                const c = C[item.color] ?? C.emerald;
                return (
                  <Fade key={item.title} delay={i * 80}>
                    <div className={`rounded-xl bg-gray-900 border ${c.border} p-5 hover:shadow-xl ${c.glow} transition-all hover:-translate-y-0.5 card-gradient-border`}>
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl mb-3`}>{item.icon}</div>
                      <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </Fade>
                );
              })}
            </div>

            <Fade>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-lg sm:max-w-none mx-auto">
                <a href="https://t.me/rithuusalve" target="_blank" rel="noopener noreferrer"
                  className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] sm:hover:scale-105 hover:brightness-110 shadow-lg"
                  style={{ backgroundColor: '#0088cc' }}>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram: @rithuusalve
                </a>
                <a href="https://instagram.com/rithuusalve" target="_blank" rel="noopener noreferrer"
                  className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] sm:hover:scale-105 hover:brightness-110 shadow-lg"
                  style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  Instagram: @rithuusalve
                </a>
                <a href="https://wa.me/919284223699" target="_blank" rel="noopener noreferrer"
                  className="touch-target inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] sm:hover:scale-105 hover:brightness-110 shadow-lg"
                  style={{ backgroundColor: '#25D366' }}>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="truncate">WhatsApp: +91 92842 23699</span>
                </a>
              </div>
            </Fade>
          </div>
        </section>

        {/* ════ CONTACT ════ */}
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeader
              eyebrow="Get In Touch"
              title={<>Questions Before <span className="text-emerald-400">You Enroll?</span></>}
              sub="June batch starts 8 June 2026. Use the enrollment section above for UPI & seat booking — or message us here."
            />

            <Fade>
              <div className="max-w-xl mx-auto space-y-6">
                <button
                  type="button"
                  onClick={() => scrollTo('enroll')}
                  className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-sm font-bold text-amber-300 hover:bg-amber-500/15 transition-colors"
                >
                  ↑ Go to June Enrollment (UPI + ₹2,000 booking)
                </button>

                <a
                  href={WHATSAPP_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target flex items-center justify-center gap-3 w-full rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-h-[52px] text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] sm:hover:scale-[1.02] hover:brightness-110 shadow-2xl shadow-[#25D366]/25"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Ask on WhatsApp (message pre-typed)
                </a>

                <a
                  href={TELEGRAM_DEFAULT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target flex items-center justify-center gap-3 w-full rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-h-[52px] text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] sm:hover:scale-[1.02] hover:brightness-110 shadow-2xl shadow-[#0088cc]/25"
                  style={{ backgroundColor: '#0088cc' }}
                >
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Ask on Telegram (message pre-typed)
                </a>

                <p className="text-center text-sm text-gray-500">
                  +91 92842 23699 · @rithuusalve
                </p>

                <div className="rounded-2xl bg-gradient-to-br from-emerald-500/8 to-teal-500/5 border border-emerald-500/20 p-6 space-y-3 card-gradient-border">
                  <h4 className="font-bold text-white text-sm text-center">What happens next?</h4>
                  {[
                    'Pay ₹2,000 on UPI & message us with screenshot',
                    "We'll confirm your spot and share batch details",
                    'Onboarding call before the first session',
                    'You start trading smarter in Week 1',
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </section>
      </main>

      {/* ════ FOOTER ════ */}
      <footer className="border-t border-gray-800 bg-gray-950 px-4 sm:px-6 py-6 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-4">
            <p className="text-sm font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">FX:Rich</span>
              <span className="text-white"> Traders</span>
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-gray-600 max-w-md sm:max-w-none">
              {NAV_LINKS.map((link) => (
                <button key={link.id} type="button" onClick={() => scrollTo(link.id)} className="touch-target px-2 py-1 hover:text-emerald-400 transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-600">
              <a href="https://t.me/rithuusalve"       target="_blank" rel="noopener noreferrer" className="hover:text-[#0088cc] transition-colors">Telegram</a>
              <span className="text-gray-800">·</span>
              <a href="https://instagram.com/rithuusalve" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Instagram</a>
              <span className="text-gray-800">·</span>
              <a href="https://wa.me/919284223699"     target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-gray-700">© {new Date().getFullYear()} FX:Rich Traders by Rithuu. All rights reserved.</p>
            <p className="text-xs text-gray-800 max-w-xl text-center sm:text-right">
              <span className="text-gray-700">Risk Disclaimer: </span>
              Educational content only. Forex trading carries significant risk. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </footer>

      {/* ════ MOBILE STICKY CTA ════ */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-gray-800 px-4 pt-3 safe-bottom">
        <a
          href={WA_RESERVE}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target flex w-full items-center justify-center rounded-xl bg-[#25D366] py-3.5 min-h-[48px] font-bold text-white active:brightness-95 transition-all text-sm shadow-xl shadow-[#25D366]/30"
        >
          Reserve Seat — ₹2,000
        </a>
      </div>
    </>
  );
}
