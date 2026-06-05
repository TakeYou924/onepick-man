import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const categories: Category[] = [
  {
    id: "1",
    name: "양말",
    slug: "socks",
    emoji: "🧦",
    description: "매일 신어도 무난한 기본 양말",
  },
  {
    id: "2",
    name: "속옷",
    slug: "underwear",
    emoji: "🩲",
    description: "편하고 실패 없는 데일리 속옷",
  },
  {
    id: "3",
    name: "벨트",
    slug: "belt",
    emoji: "👔",
    description: "어떤 바지에도 어울리는 심플 벨트",
  },
  {
    id: "4",
    name: "흰 티셔츠",
    slug: "white-tshirt",
    emoji: "👕",
    description: "겹쳐 입기 좋은 기본 화이트 티",
  },
  {
    id: "5",
    name: "면도기",
    slug: "razor",
    emoji: "🪒",
    description: "부담 없이 쓰는 데일리 면도기",
  },
  {
    id: "6",
    name: "수건",
    slug: "towel",
    emoji: "🛁",
    description: "흡수력과 촉감의 균형이 좋은 수건",
  },
  {
    id: "7",
    name: "슬리퍼",
    slug: "slippers",
    emoji: "🥿",
    description: "집 안에서 편하게 신는 슬리퍼",
  },
  {
    id: "8",
    name: "우산",
    slug: "umbrella",
    emoji: "☂️",
    description: "가볍고 튼튼한 기본 우산",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    categorySlug: "socks",
    brandName: "Standard Socks",
    productName: "데일리 코튼 크루삭스 5족",
    price: 12900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Socks",
    purchaseUrl: "https://example.com/socks",
    summary: "두께와 신축성이 균형 잡힌 기본 양말. 출퇴근·운동 모두 무난합니다.",
    reasons: [
      "색상이 튀지 않아 어떤 신발에도 어울림",
      "세탁 후에도 형태가 잘 유지됨",
      "5족 구성이라 교체 주기 관리가 쉬움",
    ],
  },
  {
    id: "p2",
    categorySlug: "underwear",
    brandName: "Daily Underwear",
    productName: "코튼 드로즈 3매",
    price: 24900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Underwear",
    purchaseUrl: "https://example.com/underwear",
    summary: "허리 밴드가 편하고 통기성이 좋은 기본 드로즈. 매일 입기에 부담이 없습니다.",
    reasons: [
      "핏이 과하지 않아 활동 시 편안함",
      "면 소재로 피부 자극이 적음",
      "무난한 컬러라 옷차림에 신경 쓸 필요 없음",
    ],
  },
  {
    id: "p3",
    categorySlug: "belt",
    brandName: "Plain Belt Co.",
    productName: "클래식 레더 벨트",
    price: 19900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Belt",
    purchaseUrl: "https://example.com/belt",
    summary: "정장·캐주얼 모두 커버하는 심플한 가죽 벨트. 버클 디자인이 과하지 않습니다.",
    reasons: [
      "검정·갈색 중 선택만 하면 대부분의 하의와 매칭",
      "버클이 작아 캐주얼룩에도 자연스러움",
      "가격 대비 마감이 깔끔함",
    ],
  },
  {
    id: "p4",
    categorySlug: "white-tshirt",
    brandName: "Basic Tee Lab",
    productName: "헤비웨이트 화이트 티셔츠",
    price: 15900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=White+Tee",
    purchaseUrl: "https://example.com/white-tshirt",
    summary: "비침이 적고 핏이 안정적인 기본 화이트 티. 단독·이너 모두 가능합니다.",
    reasons: [
      "어깨선과 기장이 무난해 체형 부담이 적음",
      "두께감이 있어 단독 착용해도 괜찮음",
      "세탁 후에도 흰색이 빠르게 누렇게 변하지 않음",
    ],
  },
  {
    id: "p5",
    categorySlug: "razor",
    brandName: "Clean Shave",
    productName: "5중날 일회용 면도기 4개입",
    price: 8900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Razor",
    purchaseUrl: "https://example.com/razor",
    summary: "교체 주기 걱정 없이 쓰는 실속형 면도기. 첫 면도부터 부담이 적습니다.",
    reasons: [
      "손잡이 그립이 안정적",
      "날 교체 없이 간편하게 사용",
      "가격이 낮아 정기 구매 부담이 적음",
    ],
  },
  {
    id: "p6",
    categorySlug: "towel",
    brandName: "Soft Towel",
    productName: "호텔 타월 2장",
    price: 21900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Towel",
    purchaseUrl: "https://example.com/towel",
    summary: "흡수력과 건조 속도의 균형이 좋은 기본 수건. 욕실·피트니스 모두 적합합니다.",
    reasons: [
      "촉감이 거칠지 않아 매일 사용하기 좋음",
      "건조가 비교적 빨라 냄새 관리가 쉬움",
      "사이즈가 커서 한 장으로 충분함",
    ],
  },
  {
    id: "p7",
    categorySlug: "slippers",
    brandName: "Home Step",
    productName: "메모리폼 실내화",
    price: 17900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Slippers",
    purchaseUrl: "https://example.com/slippers",
    summary: "발바닥을 부드럽게 받쳐주는 기본 실내화. 디자인이 심플해 집 어디에나 어울립니다.",
    reasons: [
      "착화감이 편해 장시간 착용 가능",
      "바닥 소음이 적음",
      "세탁·관리가 간단함",
    ],
  },
  {
    id: "p8",
    categorySlug: "umbrella",
    brandName: "Rain Ready",
    productName: "3단 자동 우산",
    price: 14900,
    imageUrl: "https://placehold.co/600x600/f5f5f7/86868b?text=Umbrella",
    purchaseUrl: "https://example.com/umbrella",
    summary: "가볍고 열고 닫기 쉬운 기본 우산. 출퇴근용으로 들고 다니기 좋습니다.",
    reasons: [
      "무게가 가벼워 가방에 넣기 편함",
      "자동 개폐로 사용이 간단함",
      "검정 단색이라 어떤 옷차림에도 무난함",
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductByCategorySlug(slug: string): Product | undefined {
  return products.find((p) => p.categorySlug === slug);
}
