const stats = [
  { label: "Total Users", value: "1,248" },
  { label: "Active Decks", value: "4,892" },
  { label: "Open Inquiries", value: "18" },
  { label: "System Events", value: "326" },
];

export default function AdminDashboard() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-black">Dashboard</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Monitor FlashMind activity and platform health.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900"
          >
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-black">{stat.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
