import type {Metadata} from "next";
import Link from "next/link";
import {listNotices} from "@/lib/cms";

export const metadata: Metadata = {
    title: "お知らせ",
};

export default async function NoticesPage() {
    const notices = await listNotices();
    const now = Date.now();
    const allImportant = notices.filter((n) => n.important);
    const importantNotices = allImportant.filter((n, i) =>
        i < 3 || (!!n.date && (now - new Date(n.date).getTime()) / 86400000 <= 30)
    );
    const importantSlugs = new Set(importantNotices.map((n) => n.slug));
    // 重要枠に出ないものを一般枠に（古い重要も含む、ラベルなし）
    const regularNotices = notices.filter((n) => !importantSlugs.has(n.slug));

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">お知らせ</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Webサイトからのお知らせ</p>
            </div>

            {importantNotices.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">⚠</span>
                        <h2 className="text-xl font-bold text-accentRed">重要なお知らせ</h2>
                    </div>
                    <ul className="space-y-3">
                        {importantNotices.map((notice) => (
                            <li key={notice.slug}>
                                <Link
                                    href={`/notices/${notice.slug}`}
                                    className="block bg-accentRed/10 border border-accentRed/40 rounded-lg p-5 hover:border-accentRed/70 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="shrink-0 text-xs font-bold bg-accentRed text-white px-2 py-0.5 rounded mt-0.5">重要</span>
                                        <div className="min-w-0">
                                            <p className="text-sm text-gray-400 mb-1">
                                                {notice.date
                                                    ? new Date(notice.date).toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo"})
                                                    : ""}
                                                {notice.category && (
                                                    <span className="ml-2 text-xs border border-gray-600 text-gray-400 px-1.5 py-0.5 rounded">{notice.category}</span>
                                                )}
                                            </p>
                                            <p className="text-gray-900 dark:text-white font-semibold">{notice.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                {importantNotices.length > 0 && regularNotices.length > 0 && (
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">お知らせ</h2>
                )}
                {notices.length === 0 ? (
                    <p className="text-gray-400 text-center">現在お知らせはありません。</p>
                ) : regularNotices.length === 0 ? null : (
                    <ul className="space-y-4">
                        {regularNotices.map((notice) => (
                            <li key={notice.slug}>
                                <Link
                                    href={`/notices/${notice.slug}`}
                                    className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accentBlue/50 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="min-w-0">
                                            <p className="text-sm text-gray-400 mb-1">
                                                {notice.date
                                                    ? new Date(notice.date).toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo"})
                                                    : ""}
                                                {notice.category && (
                                                    <span className="ml-2 text-xs border border-gray-600 text-gray-400 px-1.5 py-0.5 rounded">{notice.category}</span>
                                                )}
                                            </p>
                                            <p className="text-gray-900 dark:text-white font-semibold">{notice.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}