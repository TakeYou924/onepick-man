const criteria = [
  {
    title: "무난함",
    description:
      "튀지 않고 대부분의 상황에 자연스럽게 어울리는 제품을 우선합니다.",
  },
  {
    title: "재구매 가능성",
    description:
      "한 번 써보고 다시 살 만한 제품인지를 기준으로 선정합니다.",
  },
  {
    title: "가격 대비 만족도",
    description:
      "과한 프리미엄 없이 실사용 만족도가 높은 가격대를 선택합니다.",
  },
  {
    title: "관리 편의성",
    description:
      "세탁, 교체, 보관이 번거롭지 않은 제품을 선호합니다.",
  },
  {
    title: "과한 개성 배제",
    description:
      "유행이나 취향에 크게 흔들리지 않는 기본형을 추천합니다.",
  },
];

export default function CriteriaPage() {
  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          추천 기준
        </h1>
        <p className="mt-6 text-center text-zinc-500">
          ONEPICK MAN은 아래 기준으로 카테고리마다 하나의 제품을 고릅니다.
        </p>
        <ul className="mt-12 space-y-6">
          {criteria.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/60"
            >
              <h2 className="text-lg font-semibold text-zinc-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
