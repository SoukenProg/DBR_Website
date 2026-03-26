import {Hero} from "@/components/Hero";
import {getLatestWorkByProject, listEvents, listLinks, listNotices} from "@/lib/cms";
import {EventCard} from "@/components/EventCard";
import {SocialLinks} from "@/components/SocialLinks";
import Link from "next/link";

export default async function HomePage() {
    const [dbrWork, soukenWork, events, links, notices] = await Promise.all([
        getLatestWorkByProject("System D.B.R."),
        getLatestWorkByProject("Souken521"),
        listEvents(),
        listLinks(),
        listNotices()
    ]);
    const upcoming = events?.[0];
    return (
        <div>
            <Hero dbrWork={dbrWork} soukenWork={soukenWork}/>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
                {/* お知らせ */}
                {notices.length > 0 && (
                    <section className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">お知らせ</h2>
                        <ul className="space-y-2 mb-4">
                            {notices.slice(0, 3).map((notice) => (
                                <li key={notice.slug} className="flex items-start gap-2">
                                    {notice.important && (
                                        <span className="shrink-0 text-xs font-bold bg-accentRed text-white px-1.5 py-0.5 rounded mt-0.5">重要</span>
                                    )}
                                    <span className="text-sm text-gray-400 shrink-0">
                                        {notice.date ? new Date(notice.date).toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo"}) : ""}
                                    </span>
                                    <Link
                                        href={`/notices/${notice.slug}`}
                                        className="text-gray-700 dark:text-gray-300 hover:text-accentBlue dark:hover:text-accentBlue text-sm truncate"
                                    >
                                        {notice.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/notices" className="text-accentBlue hover:text-accentBlue/80 text-sm underline">
                            すべてのお知らせを見る →
                        </Link>
                    </section>
                )}
                {/* 作品一覧 */}
                <section className="bg-gradient-to-br from-accentRed/10 to-accentBlue/10 border border-accentRed/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-900 dark:text-white">作品一覧</h2>
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <p className="leading-relaxed">
                            オリジナル楽曲を制作しています。
                            Uplifting Trance、Future Bass、Tech House、Hardstyle など、多彩なジャンルの作品をお楽しみいただけます。
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 text-accentBlue hover:text-accentBlue/80 font-semibold underline"
                            >
                                すべての作品を見る →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* サークルの紹介 */}
                <section className="bg-accentBlue/10 border border-accentBlue/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-accentBlue">サークルの紹介</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        System D.B.R. は、音楽とビジュアルを制作するサークルです。
                        ダーク基調に赤・青・緑のグロー、Dual Bladesモチーフを軸に展開します。
                    </p>
                </section>

                {/* 主催プロフィール */}
                <section className="bg-accentGreen/10 border border-accentGreen/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-accentGreen">主催プロフィール</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Souken521: 作編曲／3D & Motion
                    </p>
                    <div className="mt-4">
                        <Link href="/about" className="text-accentBlue hover:text-accentBlue/80 underline">
                            詳しくはAboutページへ →
                        </Link>
                    </div>
                </section>

                {/* イベント出展 */}
                <section className="bg-accentRed/10 border border-accentRed/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-accentRed">イベント出展（直近）</h2>
                    {upcoming ? (
                        <EventCard event={upcoming}/>
                    ) : (
                        <div className="text-gray-400">現在予定はありません。</div>
                    )}
                    <div className="mt-4">
                        <Link href="/events" className="text-accentBlue hover:text-accentBlue/80 underline">
                            すべてのイベントを見る →
                        </Link>
                    </div>
                </section>

                {/* Discord 参加案内 */}
                <section className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-900 dark:text-white">Discord コミュニティ</h2>
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <p className="leading-relaxed">
                            System D.B.R. の公式Discordサーバーでは、最新情報の共有やメンバー同士の交流を行っています。
                            国籍・性別・年齢を問わず、さまざまな方が安心して参加できるよう運営しています。
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                            <li>新作リリース情報のいち早い共有</li>
                            <li>即売会・イベント出展の最新情報</li>
                            <li>制作の裏話やWIP（作業中）の共有</li>
                            <li>音楽・クリエイティブに関する雑談</li>
                        </ul>
                        <div className="pt-2">
                            <Link
                                href="/discord"
                                className="inline-flex items-center gap-2 text-accentBlue hover:text-accentBlue/80 font-semibold underline"
                            >
                                Discordページで詳細を見る →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 各種サービス */}
                <section className="bg-accentBlue/10 border border-accentBlue/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-accentBlue">各種サービス</h2>
                    <SocialLinks items={links}/>
                </section>
            </div>
        </div>
    );
}
