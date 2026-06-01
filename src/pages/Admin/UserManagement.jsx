const users = [
  { name: "Ariana Lee", email: "ariana@example.com", role: "user", status: "Active" },
  { name: "Marco Reyes", email: "marco@example.com", role: "admin", status: "Active" },
  { name: "Nina Patel", email: "nina@example.com", role: "user", status: "Pending" },
];

export default function UserManagement() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-black">User Management</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Review users, roles, and account status.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-200 px-5 py-3 text-sm font-bold text-slate-500 dark:border-white/10 dark:text-slate-400">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
        </div>
        {users.map((user) => (
          <div
            key={user.email}
            className="grid grid-cols-1 gap-2 border-b border-slate-100 px-5 py-4 text-sm last:border-0 dark:border-white/10 md:grid-cols-4 md:gap-4"
          >
            <span className="font-semibold">{user.name}</span>
            <span className="text-slate-600 dark:text-slate-300">{user.email}</span>
            <span className="capitalize text-slate-600 dark:text-slate-300">{user.role}</span>
            <span className="font-semibold text-cyan-600 dark:text-cyan-300">{user.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
