'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { UPI_ID, enrollLinks, type EnrollMessageKey } from '@/lib/contact-links';

const BENEFITS = [
  { icon: '🎥', text: '100% Live Classes + Recordings' },
  { icon: '📊', text: 'Price Action + Liquidity-Based Strategies' },
  { icon: '👥', text: 'Lifetime Community Access & Support' },
];

const CTAS: {
  key: EnrollMessageKey;
  emoji: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}[] = [
  {
    key: 'reserve',
    emoji: '✅',
    title: '₹2,000 Paid — Confirm My Seat',
    subtitle: 'Message opens ready — attach your UPI screenshot',
    featured: true,
  },
  {
    key: 'info',
    emoji: '📈',
    title: 'Send Me Full Course Details',
    subtitle: 'Fees, schedule, curriculum & how to join',
  },
];

const STEPS = [
  'Copy UPI & pay ₹2,000 to reserve',
  'Tap WhatsApp or Telegram below',
  'Send screenshot — we confirm your seat',
];

function EnrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'enroll-rise' : 'opacity-0'}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function PlatformButtons({ messageKey, large }: { messageKey: EnrollMessageKey; large?: boolean }) {
  const { whatsapp, telegram } = enrollLinks(messageKey);
  const btn = large ? 'py-3.5 min-h-[48px] text-sm' : 'py-3 min-h-[44px] text-sm';

  return (
    <div className="flex flex-col sm:flex-row gap-2.5">
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`touch-target group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 active:scale-[0.98] sm:hover:brightness-110 sm:hover:scale-[1.02] hover:shadow-[#25D366]/35 ${btn}`}
      >
        <svg className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        WhatsApp
      </a>
      <a
        href={telegram}
        target="_blank"
        rel="noopener noreferrer"
        className={`touch-target group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0088cc] px-4 font-bold text-white shadow-lg shadow-[#0088cc]/20 transition-all duration-300 active:scale-[0.98] sm:hover:brightness-110 sm:hover:scale-[1.02] hover:shadow-[#0088cc]/35 ${btn}`}
      >
        <svg className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        Telegram
      </a>
    </div>
  );
}

export function EnrollmentSection() {
  const [copied, setCopied] = useState(false);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="enroll"
      className="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden scroll-mt-[calc(3.5rem+env(safe-area-inset-top))] bg-gray-900/50 border-y border-gray-800/60"
    >
      {/* Ambient — matches hero */}
      <div className="absolute top-1/4 -left-32 w-[min(90vw,420px)] h-[min(90vw,420px)] rounded-full bg-emerald-500/10 blur-[80px] sm:blur-[110px] animate-float-a pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[min(80vw,380px)] h-[min(80vw,380px)] rounded-full bg-teal-500/8 blur-[70px] sm:blur-[100px] animate-float-b pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,720px)] h-[320px] rounded-full bg-cyan-500/5 blur-[90px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <EnrollReveal className="text-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-5 max-w-[95vw] rounded-full border border-emerald-500/30 bg-emerald-500/8 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-400 animate-shimmer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            June Online Batch · Enrollments Open
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight px-1">
            Forex Mastery{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-gradient">
              June 2026
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            5-week mentorship for serious traders —{' '}
            <span className="text-white font-medium">no signal dependency</span>, real skill building.
          </p>
        </EnrollReveal>

        {/* Stat pills */}
        <EnrollReveal delay={80} className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 mb-10 sm:mb-12">
          {[
            { label: 'Starts', value: '8 June', valueLg: '8 June 2026', accent: 'text-teal-300 border-teal-500/25 bg-teal-500/10' },
            { label: 'Seats', value: '10', valueLg: 'Only 10', accent: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10 enroll-seat-pulse' },
            { label: 'Reserve', value: '₹2K', valueLg: '₹2,000', accent: 'text-amber-300 border-amber-500/25 bg-amber-500/10' },
          ].map((pill) => (
            <div
              key={pill.label}
              className={`rounded-xl sm:rounded-2xl border px-2 sm:px-5 py-2.5 sm:py-3 text-center sm:min-w-[120px] backdrop-blur-sm transition-transform sm:hover:-translate-y-0.5 ${pill.accent}`}
            >
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-gray-500">{pill.label}</p>
              <p className="text-sm sm:text-lg font-extrabold text-white mt-0.5">
                <span className="sm:hidden">{pill.value}</span>
                <span className="hidden sm:inline">{pill.valueLg}</span>
              </p>
            </div>
          ))}
        </EnrollReveal>

        {/* Main panel */}
        <EnrollReveal delay={120}>
          <div className="relative rounded-3xl bg-gray-950/80 border border-gray-800/80 overflow-hidden card-gradient-border shadow-2xl shadow-black/40">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none enroll-border-glow" />

            <div className="relative grid lg:grid-cols-5 gap-0">
              {/* Left — benefits */}
              <div className="lg:col-span-2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-800/80 space-y-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">
                    What you get
                  </p>
                  <ul className="space-y-4">
                    {BENEFITS.map((item, i) => (
                      <li
                        key={item.text}
                        className="flex gap-3 items-start rounded-xl bg-gray-900/60 border border-gray-800/60 p-3.5 transition-all duration-300 hover:border-emerald-500/25 hover:bg-emerald-500/5 hover:-translate-y-0.5"
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <span className="text-lg shrink-0" aria-hidden>{item.icon}</span>
                        <span className="text-sm text-gray-300 leading-snug pt-0.5">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-4">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-emerald-400 font-bold">₹2,000 booking</span> — reserve now, pay the balance
                    before batch day. Small batch so every student gets personal attention.
                  </p>
                </div>

                <blockquote className="text-sm text-gray-500 italic border-l-2 border-emerald-500/50 pl-4 leading-relaxed">
                  Invest in your skill — or keep losing like retailers. The choice is yours.
                  <footer className="mt-2 text-xs text-emerald-500/90 not-italic font-bold">
                    — Rithuu&apos;s FX:Rich Team
                  </footer>
                </blockquote>
              </div>

              {/* Right — UPI + flow */}
              <div className="lg:col-span-3 p-6 sm:p-8 space-y-6 bg-gray-900/30">
                <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/50 to-gray-900/80 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">
                        Step 1
                      </span>
                      <h3 className="text-xl font-extrabold text-white">Pay on UPI</h3>
                      <p className="text-sm text-gray-500 mt-1">Reserve your seat with ₹2,000</p>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl enroll-seat-pulse">
                      💳
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl bg-black/50 border border-gray-700/80 px-4 py-3.5 group hover:border-emerald-500/40 transition-colors">
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">UPI ID</p>
                      <p className="font-mono text-sm sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 break-all sm:truncate">
                        {UPI_ID}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={copyUpi}
                      className={`touch-target shrink-0 w-full sm:w-auto rounded-lg px-4 py-3 sm:py-2.5 text-sm sm:text-xs font-bold transition-all duration-300 ${
                        copied
                          ? 'bg-emerald-500 text-gray-950 scale-105'
                          : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 hover:scale-105'
                      }`}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
                    How to enroll
                  </p>
                  <ol className="space-y-2">
                    {STEPS.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-3 items-center text-sm text-gray-400 rounded-lg bg-gray-800/30 border border-gray-800/50 px-3 py-2.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Step 2 — message us (pre-typed)
                </p>
              </div>
            </div>

            {/* CTA strip */}
            <div className="relative border-t border-gray-800/80 bg-gray-950/60 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {CTAS.map((cta, i) => (
                <div
                  key={cta.key}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    cta.featured
                      ? 'border-emerald-500/35 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:shadow-emerald-500/15 card-gradient-border'
                      : 'border-gray-800 bg-gray-900/50 hover:border-cyan-500/30 hover:shadow-cyan-500/10'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex gap-3 mb-4">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
                        cta.featured ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-cyan-500/10 border border-cyan-500/25'
                      }`}
                      aria-hidden
                    >
                      {cta.emoji}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">{cta.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{cta.subtitle}</p>
                    </div>
                  </div>
                  <PlatformButtons messageKey={cta.key} large={cta.featured} />
                </div>
              ))}
            </div>
          </div>
        </EnrollReveal>
      </div>
    </section>
  );
}
