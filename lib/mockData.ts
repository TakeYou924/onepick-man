import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const categories: Category[] = [
  {
    id: "1",
    name: "양말",
    slug: "socks",
    emoji: "🧦",
    description: "매일 신어도 무난한 기본 양말",
    statusLabel: "정착 완료",
    shortLine: "매일 신는 건 이걸로",
  },
  {
    id: "2",
    name: "팬티",
    slug: "underwear",
    emoji: "🩲",
    description: "편하고 실패 없는 데일리 속옷",
    statusLabel: "재구매 중",
    shortLine: "편한 건 오래 감",
  },
  {
    id: "3",
    name: "벨트",
    slug: "belt",
    emoji: "👔",
    description: "어떤 바지에도 어울리는 심플 벨트",
    statusLabel: "이걸로 끝",
    shortLine: "튀지 않고 오래 쓰는 것",
  },
  {
    id: "4",
    name: "립밤",
    slug: "lip-balm",
    emoji: "🫦",
    description: "가방 안에 하나씩 넣어두는 립밤",
    statusLabel: "가방에 하나",
    shortLine: "겨울 전에 챙기는 것",
  },
  {
    id: "5",
    name: "베개",
    slug: "pillow",
    emoji: "🛏️",
    description: "바꾸면 바로 차이 나는 수면 베개",
    statusLabel: "잠 잘 옴",
    shortLine: "바꾸면 바로 느껴짐",
  },
  {
    id: "6",
    name: "검정 이너티",
    slug: "black-inner-tee",
    emoji: "🖤",
    description: "아무 옷 안에 받쳐 입는 검정 티",
    statusLabel: "계속 입음",
    shortLine: "아무 옷 안에 받쳐 입기",
  },
  {
    id: "7",
    name: "수건",
    slug: "towel",
    emoji: "🛁",
    description: "흡수력과 촉감의 균형이 좋은 수건",
    statusLabel: "계속 이거",
    shortLine: "매일 쓰는 건 무난하게",
  },
  {
    id: "8",
    name: "슬리퍼",
    slug: "slippers",
    emoji: "🥿",
    description: "집 안에서 편하게 신는 슬리퍼",
    statusLabel: "집에서 고정",
    shortLine: "집 안에서 계속 신는 것",
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
    id: "p7",
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
    id: "p8",
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
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductByCategorySlug(slug: string): Product | undefined {
  return products.find((p) => p.categorySlug === slug);
}
