const logs = [
  "Admin signed in",
  "User role updated",
  "New inquiry created",
  "Study deck generated",
];

export default function Logs() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-black">Logs</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Recent system and administrative events.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <ol className="space-y-4">
          {logs.map((log, index) => (
            <li key={log} className="flex gap-3 text-sm">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-100 text-xs font-black text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200">
                {index + 1}
              </span>
              <span className="pt-1 text-slate-700 dark:text-slate-200">{log}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
