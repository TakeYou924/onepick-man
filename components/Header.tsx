import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900"
        >
          ONEPICK MAN
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600">
          <Link href="/criteria" className="transition-colors hover:text-zinc-900">
            기준
          </Link>
          <Link href="/brand" className="transition-colors hover:text-zinc-900">
            브랜드
          </Link>
          <Link href="/admin" className="transition-colors hover:text-zinc-900">
            관리자
          </Link>
        </nav>
      </div>
    </header>
  );
}
