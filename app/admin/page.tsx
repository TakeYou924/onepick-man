const stats = [
  { label: "총 클릭 수", value: "준비 중" },
  { label: "카테고리별 클릭 수", value: "준비 중" },
  { label: "제품별 클릭 수", value: "준비 중" },
];

export default function AdminPage() {
  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          관리자
        </h1>
        <p className="mt-6 text-center text-zinc-500">
          클릭 통계 대시보드는 추후 연동 예정입니다.
        </p>
        <ul className="mt-12 space-y-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex items-center justify-between rounded-2xl bg-white px-8 py-6 shadow-sm ring-1 ring-zinc-200/60"
            >
              <span className="text-sm font-medium text-zinc-900">
                {stat.label}
              </span>
              <span className="text-sm text-zinc-400">{stat.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
