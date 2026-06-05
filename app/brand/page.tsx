export default function BrandPage() {
  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          ONEPICK MAN
        </h1>
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/60 sm:p-10">
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            ONEPICK MAN은 선택 피로를 줄이기 위한 남성 생활제품 원픽 큐레이션
            서비스입니다.
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
            양말, 속옷, 벨트처럼 매일 쓰지만 비교하기 귀찮은 제품군마다 가장
            무난한 선택 하나만 제안합니다. 더 많은 옵션 대신, 더 적은 고민을
            목표로 합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
