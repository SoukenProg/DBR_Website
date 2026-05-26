import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    About
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    DTMer / ボカロP / エンジニアの卵。埼玉県出身。
                </p>
            </div>

            <div className="space-y-8">

                {/* プロジェクト */}
                <div className="bg-gradient-to-br from-accentRed/10 via-accentGreen/10 to-accentBlue/10 border border-accentBlue/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">プロジェクト</h2>
                    <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                        <li>
                            <p className="font-bold text-gray-900 dark:text-white">
                                System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span>
                            </p>
                            <p className="text-sm mt-1 ml-4">
                                Dual Blades Residence（双剣の住処）をテーマに、音楽を制作するサークル。
                            </p>
                        </li>
                        <li>
                            <p className="font-bold text-accentPurple">Souken521</p>
                            <p className="text-sm mt-1 ml-4">
                                個人名義での楽曲制作活動。 様々なジャンルへの挑戦や実験的なアプローチを行っている。
                            </p>
                        </li>
                    </ul>
                </div>

                {/* 好きなもの */}
                <div className="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">好きなもの</h2>
                    <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>
                            <span className="font-semibold text-gray-900 dark:text-white">音楽ジャンル</span>
                            <ul className="ml-5 mt-1 space-y-1 list-disc list-outside">
                                <li>音ゲー曲 / EDM / Eurobeat</li>
                                <li>他にも色々聴く雑食系。</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-900 dark:text-white">ゲーム</span>
                            <ul className="ml-5 mt-1 space-y-1 list-disc list-outside">
                                <li>音ゲー（ゲキチュウマイ・SDVX メイン）</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* 制作環境 */}
                <div className="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">制作環境</h2>
                    <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>
                            <span className="font-semibold text-gray-900 dark:text-white">DAW</span>
                            <ul className="ml-5 mt-1 space-y-1 list-disc list-outside">
                                <li>Steinberg Cubase Pro 15（メイン）</li>
                                <li>Apple Logic Pro（サブ）</li>
                                <li>FL Studio / Studio One（所持のみ）</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-900 dark:text-white">機材</span>
                            <ul className="ml-5 mt-1 space-y-1 list-disc list-outside">
                                <li>Steinberg UR22C（オーディオI/F）</li>
                                <li>GIGABYTE M27U / Acer Nitro VG0（モニター）</li>
                                <li>PRESONUS Eris 3.5BT（スピーカー）</li>
                                <li>CLASSIC PRO CM5（マイク）</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold text-gray-900 dark:text-white">その他ソフト</span>
                            <ul className="ml-5 mt-1 space-y-1 list-disc list-outside">
                                <li>Blender / Adobe CC / Apple Creator Studio</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* 所属・旧所属 */}
                <div className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">所属</h2>
                    <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                        <li>
                            <p className="font-bold text-gray-900 dark:text-white">お勉強鯖</p>
                            <p className="text-sm mt-1 ml-4">
                                分野や学問領域を問わず、自己研鑽を目的とした「お勉強」を奨励するDiscordコミュニティ。
                                作曲や創作全般の知見を深めるため参加。コンピレーションアルバム『お勉強鯖コンピ Stationery!』シリーズに参加経験あり。
                            </p>
                        </li>
                    </ul>
                    <h2 className="text-2xl font-bold mt-8 mb-6 text-gray-900 dark:text-white">旧所属</h2>
                    <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                        <li>
                            <p className="font-bold text-gray-900 dark:text-white">FancyRecords</p>
                            <p className="text-sm mt-1 ml-4">
                                法政大学小金井キャンパスの作曲サークル。2022〜2023年度参加。現在はOB。
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
