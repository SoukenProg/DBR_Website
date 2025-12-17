export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    About System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span>
                </h1>
                <p className="text-lg text-gray-300">
                    音楽をメインとしたSouken521主催のサークル
                </p>
            </div>

            {/* サークル概要 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentBlue">サークル概要</h2>
                <p className="text-gray-300 leading-relaxed">
                    「System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span>」は、リズムゲームに適したダンスミュージック、ビジュアルデザイン、3D/モーショングラフィックスを制作しています。
                    Dual Blades（二刀流）をテーマに、サイバーパンクとグロー演出を融合させた独自の世界観を表現しています。
                </p>
            </div>

            {/* 主催プロフィール */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentGreen">主催プロフィール</h2>
                <div className="space-y-4 text-gray-300">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentRed mb-2">作編曲</h3>
                        <p className="text-sm">
                            Uplifting Trance / Future Bass / Tech House / Hardstyle など
                        </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentBlue mb-2">使用ツール</h3>
                        <p className="text-sm">
                            Cubase / Studio One / FL　Studio / Blender / After Effects / Illustrator ほか
                        </p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="font-semibold text-accentGreen mb-2">テーマ</h3>
                        <p className="text-sm">
                            Dual Blades / サイバーパンク / グロー演出
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
                        <span>リズムゲーム向けのオリジナル楽曲制作</span>
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