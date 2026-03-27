'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Journey', id: 'journey' },
  { label: 'Courses', id: 'courses' },
  { label: 'Community', id: 'community' },
  { label: 'Contact', id: 'contact' },
];

const COURSES = [
  {
    id: 1,
    title: 'Forex Foundations',
    level: 'Beginner',
    badgeClass: 'bg-emerald-500/20 text-emerald-400',
    description:
      'Build an unshakeable base: currency pairs, pips, lot sizes, trading sessions, and the psychology that separates consistent traders from gamblers.',
    ytId: '', // ← paste YouTube video ID here when ready
  },
  {
    id: 2,
    title: 'Advanced Price Action',
    level: 'Intermediate',
    badgeClass: 'bg-yellow-500/20 text-yellow-400',
    description:
      'Read naked charts with confidence. Master market structure, order blocks, fair-value gaps, and high-probability entry models used by institutional traders.',
    ytId: '',
  },
  {
    id: 3,
    title: 'Risk & Trade Management',
    level: 'Intermediate',
    badgeClass: 'bg-yellow-500/20 text-yellow-400',
    description:
      'The single skill that separates funded traders from blown accounts. Covers position sizing, RR ratios, max drawdown rules, and journaling for growth.',
    ytId: '',
  },
  {
    id: 4,
    title: 'Funded Trader Blueprint',
    level: 'Advanced',
    badgeClass: 'bg-red-500/20 text-red-400',
    description:
      'A step-by-step framework to pass prop-firm challenges. Challenge selection, rules management, scaling strategy, and long-term consistency as a funded trader.',
    ytId: '',
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

// ─── VideoPlaceholder ─────────────────────────────────────────────────────────

function VideoPlaceholder({ ytId, title }: { ytId: string; title: string }) {
  if (ytId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video rounded-xl border border-gray-700"
      />
    );
  }
  return (
    <div className="w-full aspect-video rounded-xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <svg className="w-6 h-6 text-emerald-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className="text-sm text-gray-600 font-medium">Demo video coming soon</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const lastSubmit = useRef(0);

  // Navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Async POST with 3 s debounce + loading guard to prevent spam clicks
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (status === 'loading' || now - lastSubmit.current < 3000) return;
      lastSubmit.current = now;

      setStatus('loading');
      setErrorMsg('');

      try {
        const res = await fetch(`${API_URL}/api/v1/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            (data as { detail?: string }).detail ?? 'Server error. Please try again.'
          );
        }
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } catch (err) {
        setStatus('error');
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      }
    },
    [form, status]
  );

  return (
    <>
      {/* ════════════════════════════════════════════
          STICKY NAVBAR
      ════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="text-xl font-extrabold tracking-tight text-white"
          >
            Forex<span className="text-emerald-400">Pro</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:inline-flex rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-gray-950 hover:bg-emerald-400 transition-colors"
          >
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800 px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-gray-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-gray-950 hover:bg-emerald-400 transition-colors text-center"
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      <main className="overflow-x-hidden">
        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.12),transparent)] pointer-events-none" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div className="relative z-10 max-w-4xl w-full">
            {/* Badge */}
            <span className="inline-block mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 tracking-wide">
              Proven. Structured. Real Results.
            </span>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Master the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Markets
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From blown accounts to funded trader — learn forex the right way.
              Battle-tested courses, honest strategy, and a community of traders
              who actually trade.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo('courses')}
                className="rounded-xl bg-emerald-500 px-8 py-4 font-bold text-gray-950 hover:bg-emerald-400 transition-all hover:scale-[1.03] shadow-xl shadow-emerald-500/20"
              >
                View Courses
              </button>
              <button
                onClick={() => scrollTo('journey')}
                className="rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white hover:border-emerald-500 hover:text-emerald-400 transition-all"
              >
                Read My Story →
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
              {[
                { value: '3+', label: 'Years Trading' },
                { value: '4', label: 'Courses' },
                { value: '100+', label: 'Students' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-emerald-400">{stat.value}</span>
                  <span className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            ABOUT / JOURNEY
        ════════════════════════════════════════════ */}
        <section id="journey" className="py-24 px-6 bg-gray-900/40">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Image placeholder */}
              <div className="relative order-last lg:order-first">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/60 flex flex-col items-center justify-center gap-3 overflow-hidden">
                  <svg className="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-600 text-sm font-medium">Your photo here</p>
                  {/* Decorative chart lines */}
                  <svg
                    className="absolute bottom-0 left-0 right-0 w-full text-emerald-900/30"
                    height="80"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="0,70 60,52 130,58 190,28 250,38 310,14 360,22 400,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                {/* Funded badge */}
                <div className="absolute -bottom-5 -right-5 bg-emerald-500 text-gray-950 font-bold text-sm rounded-2xl px-5 py-3 shadow-xl shadow-emerald-500/30">
                  ✓ Funded Trader
                </div>
              </div>

              {/* Story */}
              <div>
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
                  The Journey
                </span>
                <h2 className="mt-3 text-4xl font-extrabold leading-tight">
                  From Blown Accounts to{' '}
                  <span className="text-emerald-400">Consistent Profits</span>
                </h2>

                <div className="mt-6 space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    The start wasn&apos;t glamorous. The first months in the markets were
                    humbling — two accounts blown chasing signals, copying trades
                    blindly, and treating risk management as an afterthought. Every
                    loss felt personal. Every blown account felt like failure.
                  </p>
                  <p>
                    The turning point came from stopping the search for shortcuts and
                    treating trading like a serious craft. Six months of pure price
                    action study, strict journaling, and disciplined risk rules
                    completely rewired how the markets read.
                  </p>
                  <p>
                    Now trading a funded account with a proven, repeatable system.
                    Everything taught in these courses is drawn from real experience —
                    no theory without proof, no strategy without live application.
                  </p>
                </div>

                {/* Timeline */}
                <div className="mt-10 space-y-4">
                  {[
                    { year: 'Year 1', text: 'Blew two accounts. Learned hard lessons about psychology and risk.' },
                    { year: 'Year 2', text: 'Rebuilt from scratch with structured price action and a trading journal.' },
                    { year: 'Year 3+', text: 'Passed first prop-firm challenge. Now trading funded and teaching others.' },
                  ].map(item => (
                    <div key={item.year} className="flex gap-4 items-start">
                      <span className="shrink-0 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mt-0.5">
                        {item.year}
                      </span>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            COURSES
        ════════════════════════════════════════════ */}
        <section id="courses" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Learn</span>
              <h2 className="mt-3 text-4xl font-extrabold">
                Structured <span className="text-emerald-400">Courses</span>
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                From total beginner to funded trader — each course builds on the last.
                No filler, no fluff, just what actually works in live markets.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {COURSES.map(course => (
                <div
                  key={course.id}
                  className="group rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${course.badgeClass}`}>
                      {course.level}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {course.description}
                  </p>
                  <VideoPlaceholder ytId={course.ytId} title={course.title} />
                  <button className="mt-4 w-full rounded-xl border border-gray-700 py-2.5 text-sm font-semibold text-gray-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors">
                    Enroll Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            COMMUNITY & LINKS
        ════════════════════════════════════════════ */}
        <section id="community" className="py-24 px-6 bg-gray-900/40">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Community</span>
            <h2 className="mt-3 text-4xl font-extrabold">
              Join Traders Who{' '}
              <span className="text-emerald-400">Actually Trade</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Real-time analysis, pre-market setups, and a no-BS community.
              No paid signals — just education and accountability.
            </p>

            {/* Social buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {/* Telegram — brand blue */}
              <a
                href="https://t.me/yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg"
                style={{ backgroundColor: '#0088cc' }}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Join Telegram Channel
              </a>

              {/* WhatsApp — brand green */}
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:brightness-110 shadow-lg"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Feature cards */}
            <div className="mt-12 grid sm:grid-cols-3 gap-5 text-left">
              {[
                {
                  icon: '📊',
                  title: 'Daily Analysis',
                  desc: 'Real market breakdowns posted every trading day before the session opens.',
                },
                {
                  icon: '🎯',
                  title: 'Trade Setups',
                  desc: 'Pre-market and live setups with clear entry, stop-loss, and take-profit levels.',
                },
                {
                  icon: '🧠',
                  title: 'Mindset Posts',
                  desc: 'Trader psychology content to keep you disciplined when markets get emotional.',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="rounded-xl bg-gray-900 border border-gray-800 p-5 hover:border-gray-700 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="mt-3 font-bold text-white text-sm">{item.title}</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CONTACT FORM
        ════════════════════════════════════════════ */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
                Get In Touch
              </span>
              <h2 className="mt-3 text-4xl font-extrabold">
                Have a <span className="text-emerald-400">Question?</span>
              </h2>
              <p className="mt-4 text-gray-400">
                Ask about a course, a concept, or anything trading-related.
                We reply within 24 hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-gray-900 border border-gray-800 p-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ask about a course, a trade concept, or anything else…"
                  className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors resize-none"
                />
              </div>

              {/* Feedback banners */}
              {status === 'success' && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-400 text-sm font-medium">
                  ✓ Message sent! We&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm font-medium">
                  ✗ {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-gray-950 hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="border-t border-gray-800 bg-gray-950 px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Brand */}
            <div className="max-w-xs">
              <p className="text-xl font-extrabold text-white">
                Forex<span className="text-emerald-400">Pro</span>
              </p>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                Structured forex education built from real trading experience.
                No fluff — only what works.
              </p>
            </div>

            {/* Quick nav */}
            <nav className="flex gap-10 text-sm text-gray-500">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Legal */}
          <div className="mt-10 pt-6 border-t border-gray-800 space-y-3">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} ForexPro Education. All rights reserved.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed max-w-4xl">
              <span className="font-semibold text-gray-600">Risk Disclaimer: </span>
              Trading foreign exchange (forex) on margin carries a high level of risk
              and may not be suitable for all investors. The high degree of leverage can
              work against you as well as for you. Before deciding to trade forex you
              should carefully consider your investment objectives, level of experience,
              and risk appetite. You could sustain a loss of some or all of your initial
              investment and therefore should not invest money you cannot afford to lose.
              All content on this website is for{' '}
              <span className="font-semibold text-gray-600">educational purposes only</span>{' '}
              and does not constitute financial or investment advice. Past performance is
              not indicative of future results.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
