import {listLinks} from "@/lib/cms";
import {SocialLinks} from "@/components/SocialLinks";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Links",
};

export default async function LinksPage() {
    const links = await listLinks();
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Links
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span> の各種SNS・配信プラットフォーム
                </p>
            </div>

            {/* リンク一覧 */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">公式リンク</h2>
                <SocialLinks items={links}/>
            </div>

            {/* 注意事項 */}
            <div className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8 mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">お知らせ</h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p className="text-gray-900 dark:text-white">
                        各プラットフォームにて、最新の楽曲リリース情報やイベント出展情報を発信しています。
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-gray-900 dark:text-white">
                        <li>楽曲の配信・販売情報</li>
                        <li>イベント・即売会の出展告知</li>
                        <li>制作進捗や裏話の共有</li>
                        <li>コミュニティとの交流</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}