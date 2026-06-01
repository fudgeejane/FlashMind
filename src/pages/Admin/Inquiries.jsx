const inquiries = [
  "PDF processing support request",
  "Question about AI flashcard accuracy",
  "Billing and account access inquiry",
];

export default function Inquiries() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-black">Inquiries</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Track student support and platform questions.
        </p>
      </div>

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <article
            key={inquiry}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900"
          >
            <h3 className="font-bold">{inquiry}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Awaiting admin review.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
