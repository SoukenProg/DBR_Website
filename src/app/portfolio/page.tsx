// ============================================================
// ポートフォリオ本体 — 就活用・本名名義
//
// 個人特定情報（氏名・住所・メール）は環境変数で管理:
//   NEXT_PUBLIC_PORTFOLIO_NAME / NAME_EN / LOCATION / EMAIL
//
// その他のデータは data.private.ts（gitignore済み）で管理。
// ============================================================

import {
    PROFILE_EXTRA,
    SKILLS,
    WORKS,
    EXPERIENCE,
    EDUCATION,
    RATING_COLOR,
    COMPETITIVE_PROGRAMMING,
} from "./data.private";


export default function PortfolioPage() {
    const PROFILE = {
        name:     process.env.NEXT_PUBLIC_PORTFOLIO_NAME     ?? "",
        nameEn:   process.env.NEXT_PUBLIC_PORTFOLIO_NAME_EN  ?? "",
        location: process.env.NEXT_PUBLIC_PORTFOLIO_LOCATION ?? "",
        email:    process.env.NEXT_PUBLIC_PORTFOLIO_EMAIL    ?? "",
        ...PROFILE_EXTRA,
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

            {/* ヘッダー */}
            <header className="border-b border-gray-200 pb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{PROFILE.name}</h1>
                <p className="text-lg text-gray-500 mt-1">{PROFILE.nameEn}</p>
                <p className="text-base text-gray-700 mt-3 font-medium">{PROFILE.title}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-gray-500">
                    <span>{PROFILE.location}</span>
                    <a href={`mailto:${PROFILE.email}`} className="hover:text-gray-700 underline">
                        {PROFILE.email}
                    </a>
                    <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-gray-700 underline">
                        GitHub
                    </a>
                    <a href={PROFILE.portfolio} target="_blank" rel="noreferrer" className="hover:text-gray-700 underline">
                        制作活動サイト
                    </a>
                </div>

                <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">{PROFILE.summary}</p>
            </header>

            {/* スキル */}
            <section>
                <SectionTitle>スキル</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {SKILLS.map(s => (
                        <div key={s.category}>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                {s.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {s.items.map(item => (
                                    <span key={item} className="px-2.5 py-0.5 bg-gray-100 rounded text-sm text-gray-700">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 制作物・プロジェクト */}
            <section>
                <SectionTitle>制作物 / プロジェクト</SectionTitle>
                <div className="space-y-8">
                    {WORKS.map(w => (
                        <div key={w.title} className="border border-gray-200 rounded-lg p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{w.title}</h3>
                                    <p className="text-sm text-gray-400 mt-0.5">{w.period}</p>
                                </div>
                                {w.links && w.links.length > 0 && (
                                    <div className="flex gap-2 shrink-0">
                                        {w.links.map(link => (
                                            <a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-600 hover:border-gray-500 hover:text-gray-900 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{w.description}</p>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {w.tags.map(t => (
                                    <span key={t} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 職歴・活動歴 */}
            <section>
                <SectionTitle>職歴 / 活動歴</SectionTitle>
                {EXPERIENCE.length === 0
                    ? <h3 className="font-semibold text-gray-900">なし</h3>
                    : <div className="space-y-6">
                        {EXPERIENCE.map(e => (
                            <div key={e.role} className="grid grid-cols-[1fr_auto] gap-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{e.role}</h3>
                                    <p className="text-sm text-gray-500">{e.org}</p>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{e.description}</p>
                                </div>
                                <p className="text-sm text-gray-400 whitespace-nowrap">{e.period}</p>
                            </div>
                        ))}
                    </div>
                }
            </section>

            {/* 競技プログラミング */}
            <section>
                <SectionTitle>競技プログラミング</SectionTitle>
                <div className="space-y-4">
                    {COMPETITIVE_PROGRAMMING.map(cp => (
                        <div key={cp.platform} className="border border-gray-200 rounded-lg p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-900">{cp.platform}</span>
                                    <a
                                        href={cp.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-gray-500 hover:underline"
                                    >
                                        @{cp.handle}
                                    </a>
                                </div>
                                <span
                                    className="text-lg font-bold tabular-nums"
                                    style={{ color: RATING_COLOR[cp.ratingColor] }}
                                >
                                    {cp.rating}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-gray-500">
                                <span>最高レーティング: <span className="font-medium text-gray-700">{cp.highestRating}</span></span>
                                <span>参加回数: <span className="font-medium text-gray-700">{cp.contestCount} 回</span></span>
                            </div>
                            {cp.note && <p className="text-sm text-gray-500 mt-2">{cp.note}</p>}
                        </div>
                    ))}
                </div>
            </section>

            {/* 学歴 */}
            <section>
                <SectionTitle>学歴</SectionTitle>
                <div className="space-y-4">
                    {EDUCATION.map(e => (
                        <div key={e.school} className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-medium text-gray-900">{e.school}</p>
                                <p className="text-sm text-gray-500">{e.degree}</p>
                                {e.note && <p className="text-sm text-gray-400 mt-0.5">{e.note}</p>}
                            </div>
                            <p className="text-sm text-gray-400 whitespace-nowrap shrink-0">
                                {e.from} 〜 {e.to}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* フッター */}
            <footer className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
                このページはアクセス制限されており、採用担当者向けの限定公開ページです。
            </footer>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            {children}
        </h2>
    );
}
