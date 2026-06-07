"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MOCK_CATEGORY_STATS } from "@/lib/analytics";

const ADMIN_PW_KEY = "opman_admin_pw";

const PERIOD_OPTIONS = [
  { label: "최근 7일", days: 7 },
  { label: "최근 14일", days: 14 },
  { label: "최근 30일", days: 30 },
];

function buildProposalText(
  categoryName: string,
  days: number,
  views: number,
  clicks: number,
  ctr: number,
  mobileRatio: number,
  topSource: string
): string {
  return (
    `최근 ${days}일간 ONEPICK MAN ${categoryName} 카테고리는 ` +
    `총 ${views.toLocaleString()}회의 상세 조회와 ` +
    `${clicks.toLocaleString()}회의 구매처 이동 클릭을 기록했습니다. ` +
    `구매처 이동률은 ${ctr}%이며, 모바일 사용자는 ${mobileRatio}%였습니다. ` +
    `주요 유입 경로는 ${topSource}으로 확인되었습니다. ` +
    `해당 카테고리는 반복 구매 가능성이 높은 생활 필수품군으로, ` +
    `귀사 제품을 ${days}일간 원픽 슬롯에 노출하는 테스트를 제안드립니다.`
  );
}

export default function ReportsPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [selectedSlug, setSelectedSlug] = useState(MOCK_CATEGORY_STATS[0].slug);
  const [selectedDays, setSelectedDays] = useState(14);
  const [copied, setCopied] = useState(false);

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
      return true;
    }
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFormLoading(true);
    try {
      const ok = await verify(password);
      if (!ok) setError("비밀번호가 올바르지 않습니다.");
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setFormLoading(false);
    }
  }

  const selectedCat = MOCK_CATEGORY_STATS.find((c) => c.slug === selectedSlug) ?? MOCK_CATEGORY_STATS[0];
  const scaledViews = Math.round((selectedCat.views * selectedDays) / 14);
  const scaledClicks = Math.round((selectedCat.clicks * selectedDays) / 14);
  const ctr = scaledViews > 0 ? parseFloat(((scaledClicks / scaledViews) * 100).toFixed(1)) : 0;

  const proposalText = buildProposalText(
    selectedCat.name,
    selectedDays,
    scaledViews,
    scaledClicks,
    ctr,
    selectedCat.mobileRatio,
    selectedCat.topSource
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(proposalText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [proposalText]);

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
            기업 제안 리포트
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
              disabled={formLoading}
              className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-700 disabled:opacity-50"
            >
              {formLoading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-zinc-100">
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* 헤더 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            기업 제안 리포트
          </h1>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-xl bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-200/60 hover:bg-zinc-50"
            >
              ← 클릭 통계
            </Link>
            <Link
              href="/admin/analytics"
              className="rounded-xl bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm ring-1 ring-zinc-200/60 hover:bg-zinc-50"
            >
              분석 대시보드
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

        {/* 설정 */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <p className="text-sm font-semibold text-zinc-900">리포트 설정</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                카테고리
              </label>
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400"
              >
                {MOCK_CATEGORY_STATS.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                기간
              </label>
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400"
              >
                {PERIOD_OPTIONS.map((opt) => (
                  <option key={opt.days} value={opt.days}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 요약 지표 */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200/60">
            <p className="text-xs text-zinc-400">조회 수</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">{scaledViews.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200/60">
            <p className="text-xs text-zinc-400">클릭 수</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">{scaledClicks.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200/60">
            <p className="text-xs text-zinc-400">CTR</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">{ctr}%</p>
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200/60">
            <p className="text-xs text-zinc-400">모바일 비율</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">{selectedCat.mobileRatio}%</p>
          </div>
        </div>

        {/* 제안 문구 */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-900">기업 제안 문구</p>
            <button
              onClick={handleCopy}
              className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-200"
            >
              {copied ? "복사됨 ✓" : "복사"}
            </button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 whitespace-pre-wrap">
            {proposalText}
          </p>
        </div>

        <p className="mt-4 text-xs text-zinc-300">
          * 조회 수는 추정값(mock)입니다. 실제 page_views 테이블 연동 후 정확도가 높아집니다.
        </p>
      </section>
    </main>
  );
}
