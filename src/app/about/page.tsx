export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    About
                </h1>
                <p className="text-lg text-gray-300">
                    Souken521の音楽制作活動
                </p>
            </div>

            {/* System D.B.R. セクション */}
            <div className="bg-gradient-to-br from-accentRed/10 via-accentGreen/10 to-accentBlue/10 border border-accentBlue/30 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span>
                </h2>
                <div className="text-gray-300 space-y-4">
                    <p className="leading-relaxed">
                        リズムゲームに適したダンスミュージック、ビジュアルデザイン、3D/モーショングラフィックスを制作するサークル。
                        Dual Blades（二刀流）をテーマに、サイバーパンクとグロー演出を融合させた独自の世界観を表現しています。
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentBlue mb-2">主なジャンル</h3>
                        <p className="text-sm">
                            Uplifting Trance / Future Bass / Tech House / Hardstyle など
                        </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentRed mb-2">テーマ</h3>
                        <p className="text-sm">
                            Dual Blades / サイバーパンク / グロー演出 / リズムゲーム向け楽曲
                        </p>
                    </div>
                </div>
            </div>

            {/* Souken521 セクション */}
            <div className="bg-accentPurple/10 border border-accentPurple/30 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentPurple">Souken521</h2>
                <div className="text-gray-300 space-y-4">
                    <p className="leading-relaxed">
                        個人名義での楽曲制作活動。System D.B.R.のテーマにとらわれず、様々なジャンルの楽曲制作に挑戦しています。
                        実験的な楽曲制作や、より幅広い音楽性の探求を行っています。
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentPurple mb-2">活動スタイル</h3>
                        <p className="text-sm">
                            ジャンルにとらわれない自由な楽曲制作 / 実験的アプローチ / コラボレーション
                        </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentPurple mb-2">使用ツール</h3>
                        <p className="text-sm">
                            Cubase / Studio One / FL Studio / Blender / After Effects / Illustrator ほか
                        </p>
                    </div>
                </div>
            </div>

            {/* 活動内容 */}
            <div className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">活動内容</h2>
                <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                        <span className="text-accentRed mt-1">▶</span>
                        <span>オリジナル楽曲制作（リズムゲーム向け、アンビエント、実験音楽など）</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accentBlue mt-1">▶</span>
                        <span>ビジュアルデザイン・3Dグラフィックス制作</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accentGreen mt-1">▶</span>
                        <span>即売会・音楽イベントへの出展</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-accentRed mt-1">▶</span>
                        <span>各種配信プラットフォームでの楽曲リリース</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}