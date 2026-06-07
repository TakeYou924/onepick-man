"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MOCK_CATEGORY_STATS,
  MOCK_SUMMARY,
  MOCK_RECENT_CLICKS,
  type MockCategoryStat,
} from "@/lib/analytics";

const ADMIN_PW_KEY = "opman_admin_pw";

interface RealClickStats {
  total: number;
  byCategory: { slug: string; count: number }[];
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-zinc-200/60">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-zinc-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-zinc-400">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [realStats, setRealStats] = useState<RealClickStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // sessionStorage에서 저장된 비밀번호 자동 확인
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PW_KEY);
    if (saved) {
      verify(saved).finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  async function verify(pw: string): Promise<boolean> {
    const res = await fetch("/api/admin/stats", {
      headers: { "x-admin-password": pw },
    });
    const json = await res.json();
    if (res.ok && json.ok) {
      setAuthed(true);
      sessionStorage.setItem(ADMIN_PW_KEY, pw);
      setRealStats(json.stats);
      return true;
    }
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatsLoading(true);
    try {
      const ok = await verify(password);
      if (!ok) setError("비밀번호가 올바르지 않습니다.");
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setStatsLoading(false);
    }
  }

  if (authLoading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-zinc-100">
        <p className="text-sm text-zinc-400">확인 중...</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex flex-1 items-center justify-center bg-zinc-100 px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900">
            분석 대시보드
          </h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              required
              autoFocus
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={statsLoading}
              className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 disabled:opacity-50"
            >
              {statsLoading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 실제 클릭 수 / mock 조회 수를 합산해 전체 지표 계산
  const totalClicks = realStats?.total ?? MOCK_SUMMARY.totalClicks;
  const totalViews = MOCK_SUMMARY.totalViews;
  const overallCtr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "—";

  // 실제 카테고리별 클릭 수를 mock과 병합
  const mergedCategoryStats: MockCategoryStat[] = MOCK_CATEGORY_STATS.map((cat) => {
    const real = realStats?.byCategory.find((r) => r.slug === cat.slug);
    const clicks = real?.count ?? cat.clicks;
    const ctr = cat.views > 0 ? parseFloat(((clicks / cat.views) * 100).toFixed(1)) : 0;
    return { ...cat, clicks, ctr };
  });

  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {/* 헤더 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              분석 대시보드
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              * 조회 수는 추정값(mock)입니다. 클릭 수는 실제 데이터입니다.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-xl bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-200/60 hover:bg-zinc-50"
            >
              ← 클릭 통계
            </Link>
            <Link
              href="/admin/reports"
              className="rounded-xl bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-200/60 hover:bg-zinc-50"
            >
              기업 제안 →
            </Link>
            <button
              onClick={() => {
                setAuthed(false);
                sessionStorage.removeItem(ADMIN_PW_KEY);
              }}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 전체 요약 */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="전체 조회 수 (추정)" value={totalViews.toLocaleString()} sub="mock 기준" />
          <StatCard label="전체 클릭 수" value={totalClicks.toLocaleString()} sub="실제 데이터" />
          <StatCard label="전체 CTR" value={`${overallCtr}%`} />
          <StatCard label="모바일 비율 (추정)" value={`${MOCK_SUMMARY.mobileRatio}%`} sub="mock 기준" />
        </div>

        {/* 카테고리별 성과 */}
        <div className="mt-10">
          <h2 className="text-base font-semibold text-zinc-900">카테고리별 성과</h2>
          <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-left text-xs font-semibold text-zinc-400">
                  <th className="px-6 py-4">카테고리</th>
                  <th className="px-4 py-4 text-right">조회 수</th>
                  <th className="px-4 py-4 text-right">클릭 수</th>
                  <th className="px-4 py-4 text-right">CTR</th>
                  <th className="px-4 py-4 text-right">모바일</th>
                  <th className="px-4 py-4 text-right">상위 유입</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {mergedCategoryStats.map((cat) => (
                  <tr key={cat.slug} className="hover:bg-zinc-50">
                    <td className="px-6 py-4 font-medium text-zinc-900">{cat.name}</td>
                    <td className="px-4 py-4 text-right text-zinc-600">{cat.views.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right text-zinc-600">{cat.clicks.toLocaleString()}</td>
                    <td className="px-4 py-4 text-right font-semibold text-zinc-900">{cat.ctr}%</td>
                    <td className="px-4 py-4 text-right text-zinc-600">{cat.mobileRatio}%</td>
                    <td className="px-4 py-4 text-right text-zinc-500">{cat.topSource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 최근 클릭 로그 */}
        <div className="mt-10">
          <h2 className="text-base font-semibold text-zinc-900">최근 클릭 로그</h2>
          <ul className="mt-4 space-y-2">
            {MOCK_RECENT_CLICKS.map((log, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-xl bg-white px-5 py-3.5 text-sm shadow-sm ring-1 ring-zinc-200/60"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
                    {log.categorySlug}
                  </span>
                  <span className="truncate text-zinc-500">{log.destinationUrl}</span>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-3 text-xs text-zinc-400">
                  <span>{log.deviceType}</span>
                  <span>{log.at}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
