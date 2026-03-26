import {notFound} from "next/navigation";
import Link from "next/link";
import {getNotice} from "@/lib/cms";

export default async function NoticeDetailPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const notice = await getNotice(slug);
    if (!notice) notFound();

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/notices" className="text-accentBlue hover:text-accentBlue/80 text-sm">
                    ← お知らせ一覧に戻る
                </Link>
            </div>

            <article>
                <div className="flex items-center gap-3 mb-4">
                    {notice.important && (
                        <span className="text-xs font-bold bg-accentRed text-white px-2 py-0.5 rounded">重要</span>
                    )}
                    {notice.category && (
                        <span className="text-xs border border-gray-600 text-gray-400 px-1.5 py-0.5 rounded">{notice.category}</span>
                    )}
                    {notice.date && (
                        <time className="text-sm text-gray-400">
                            {new Date(notice.date).toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo"})}
                        </time>
                    )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{notice.title}</h1>

                {notice.body && (
                    <div
                        className="prose prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{__html: notice.body}}
                    />
                )}
            </article>
        </div>
    );
}