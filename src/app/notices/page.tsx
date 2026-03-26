import type {Metadata} from "next";
import Link from "next/link";
import {listNotices} from "@/lib/cms";

export const metadata: Metadata = {
    title: "お知らせ",
};

export default async function NoticesPage() {
    const notices = await listNotices();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">お知らせ</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">Webサイトからのお知らせ</p>
            </div>

            {notices.length === 0 ? (
                <p className="text-gray-400 text-center">現在お知らせはありません。</p>
            ) : (
                <ul className="space-y-4">
                    {notices.map((notice) => (
                        <li key={notice.slug}>
                            <Link
                                href={`/notices/${notice.slug}`}
                                className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accentBlue/50 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    {notice.important && (
                                        <span className="shrink-0 text-xs font-bold bg-accentRed text-white px-2 py-0.5 rounded mt-0.5">重要</span>
                                    )}
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
        </div>
    );
}