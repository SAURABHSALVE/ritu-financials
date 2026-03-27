export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold tracking-tight text-center sm:text-6xl">
        Master <span className="text-emerald-400">Forex Trading</span>
      </h1>
      <p className="mt-6 max-w-2xl text-center text-lg text-gray-400">
        Follow my journey from beginner to consistent profitability. Access
        battle-tested courses, live market breakdowns, and a community of
        serious traders.
      </p>
      <div className="mt-10 flex gap-4">
        <a
          href="/courses"
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-400"
        >
          Explore Courses
        </a>
        <a
          href="/journey"
          className="rounded-lg border border-gray-700 px-6 py-3 font-semibold transition hover:border-emerald-500 hover:text-emerald-400"
        >
          My Journey
        </a>
      </div>
    </main>
  );
}
