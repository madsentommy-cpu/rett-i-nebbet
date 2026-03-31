export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 text-white px-6 text-center">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
        Mitt første Claudeeventyr
      </h1>
      <p className="text-xl text-violet-200 mb-8 max-w-xl">
        Et React-prosjekt bygget med Vite, TypeScript og Tailwind CSS.
      </p>
      <div className="flex gap-4">
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-violet-50 transition"
        >
          Vite
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-violet-400 transition"
        >
          React
        </a>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-indigo-400 transition"
        >
          Tailwind
        </a>
      </div>
    </section>
  );
}
