"use client";

import { useState } from "react";

interface CategoryStat {
  slug: string;
  count: number;
}

interface UrlStat {
  url: string;
  count: number;
}

interface Stats {
  total: number;
  byCategory: CategoryStat[];
  topUrls: UrlStat[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/stats", {
        headers: { "x-admin-password": password },
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError(
          res.status === 401 ? "비밀번호가 올바르지 않습니다." : json.error ?? "오류가 발생했습니다."
        );
        return;
      }

      setStats(json.stats);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (stats) {
    return (
      <main className="flex-1 bg-zinc-100">
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              관리자 대시보드
            </h1>
            <button
              onClick={() => {
                setStats(null);
                setPassword("");
              }}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              로그아웃
            </button>
          </div>

          {/* 총 클릭 수 */}
          <div className="mt-10 rounded-2xl bg-white px-8 py-6 shadow-sm ring-1 ring-zinc-200/60">
            <p className="text-sm font-medium text-zinc-500">총 클릭 수</p>
            <p className="mt-1 text-4xl font-bold text-zinc-900">
              {stats.total.toLocaleString()}
            </p>
          </div>

          {/* 카테고리별 클릭 수 */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-800">카테고리별 클릭 수</h2>
            {stats.byCategory.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-400">데이터가 없습니다.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {stats.byCategory.map((item) => (
                  <li
                    key={item.slug}
                    className="flex items-center justify-between rounded-2xl bg-white px-8 py-5 shadow-sm ring-1 ring-zinc-200/60"
                  >
                    <span className="text-sm font-medium text-zinc-900">{item.slug}</span>
                    <span className="text-sm font-semibold text-zinc-700">
                      {item.count.toLocaleString()}회
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 제품별 클릭 수 (TOP 10) */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-800">제품별 클릭 수 (TOP 10)</h2>
            {stats.topUrls.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-400">데이터가 없습니다.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {stats.topUrls.map((item, i) => (
                  <li
                    key={item.url}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-white px-8 py-5 shadow-sm ring-1 ring-zinc-200/60"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 shrink-0 text-xs font-bold text-zinc-400">
                        {i + 1}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-sm text-zinc-700 hover:text-zinc-900 hover:underline"
                        title={item.url}
                      >
                        {item.url}
                      </a>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-zinc-700">
                      {item.count.toLocaleString()}회
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 px-6 py-24">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900">
          관리자 로그인
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
              autoFocus
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>
          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 disabled:opacity-50"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
