const badges = ["시간과 에너지 절약", "주인장 원픽", "카테고리별 하나"];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {badges.map((label) => (
        <span
          key={label}
          className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
