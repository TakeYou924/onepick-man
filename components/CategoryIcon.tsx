// lucide 라인 아이콘을 인라인 SVG로 사용한다 (lucide-react 패키지 미설치 상태).
// slug에 매핑된 아이콘이 없으면 기본 아이콘(Package)을 사용한다.

type CategoryIconProps = {
  slug: string;
  className?: string;
};

const ICON_PATHS: Record<string, React.ReactNode> = {
  // Circle
  socks: <circle cx="12" cy="12" r="10" />,
  // 드로즈 모양 커스텀 라인 아이콘
  underwear: (
    <>
      <path d="M4 6h16" />
      <path d="M4 6l1.3 7a3.5 3.5 0 0 0 3.44 3H10a2 2 0 0 0 2-2 2 2 0 0 0 2 2h1.26a3.5 3.5 0 0 0 3.44-3L20 6" />
    </>
  ),
  // Minus
  belt: <path d="M5 12h14" />,
  // Shirt
  "white-tshirt": (
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
  ),
  // Scissors
  razor: (
    <>
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </>
  ),
  // Square
  towel: <rect width="18" height="18" x="3" y="3" rx="2" />,
  // Footprints
  slippers: (
    <>
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4" />
      <path d="M4 13h4" />
    </>
  ),
  // Umbrella
  umbrella: (
    <>
      <path d="M22 12a10.06 10.06 0 0 0-20 0Z" />
      <path d="M12 12v8a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </>
  ),
};

// Package (기본 아이콘)
const DEFAULT_ICON = (
  <>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </>
);

export default function CategoryIcon({ slug, className }: CategoryIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-7 w-7"}
      aria-hidden="true"
    >
      {ICON_PATHS[slug] ?? DEFAULT_ICON}
    </svg>
  );
}
