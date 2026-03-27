export default function CoursesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold tracking-tight">
        Our <span className="text-emerald-400">Courses</span>
      </h1>
      <p className="mt-6 max-w-2xl text-center text-lg text-gray-400">
        From fundamentals to advanced price-action strategies — structured
        courses built from real trading experience.
      </p>
      <a
        href="/"
        className="mt-10 rounded-lg border border-gray-700 px-6 py-3 font-semibold transition hover:border-emerald-500 hover:text-emerald-400"
      >
        &larr; Back Home
      </a>
    </main>
  );
}
