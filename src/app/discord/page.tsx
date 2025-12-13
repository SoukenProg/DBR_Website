export default function DiscordPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accentRed via-accentBlue to-accentGreen bg-clip-text text-transparent">
                    System D.B.R. Community
                </h1>
                <p className="text-lg text-gray-300">
                    ようこそ、System D.B.R. の公式Discordサーバーへ
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    このサーバーは現状「日本語メイン」のサーバーですが、<br />
                    国籍・性別・年齢を問わず、さまざまな方が安心して参加できるよう運営しています。
                </p>
            </div>

            {/* 招待リンクセクション */}
            <div className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8 mb-8 text-center">
                <h2 className="text-2xl font-bold mb-4">サーバーに参加する</h2>
                <p className="text-gray-300 mb-6">
                    下のボタンからDiscordサーバーに参加できます
                </p>
                <a
                    href="https://discord.gg/YOUR_INVITE_CODE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discordに参加
                </a>
            </div>

            {/* 参加手続き */}
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">📝 参加手続き</h2>
                <div className="space-y-3 text-gray-300">
                    <p>
                        荒らし防止のため、サーバー加入直後では閲覧可能チャンネルを大幅に制限しております。
                    </p>
                    <p className="font-semibold text-yellow-300">
                        利用規約に同意いただける方は、専用チャンネルで自己紹介をお願いします。
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>可能であればなんらかのSNSアカウントの貼り付けをお願いします</li>
                        <li>自己紹介が済み次第、基本チャンネルが閲覧可能になるロールを付与します</li>
                        <li>24時間経っても付与されない場合、運営までDMをお願いします</li>
                    </ul>
                </div>
            </div>

            {/* 基本ルール */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentBlue">📜 基本ルール</h2>
                <div className="space-y-3 text-gray-300">
                    <ol className="list-decimal list-inside space-y-3 ml-2">
                        <li>
                            <strong>運営やモデレーターの指示には必ず従ってください。</strong>
                            <p className="text-sm text-gray-400 ml-6 mt-1">
                                （トラブルや荒らし対策のため、一時的なミュート・キック等を行う場合があります）
                            </p>
                        </li>
                        <li>
                            <strong>宣伝行為は専用チャンネルでのみ行ってください。</strong>
                        </li>
                        <li>
                            <strong>NSFWコンテンツに関する発言には専用ロールがあります。</strong>
                            <p className="text-sm text-gray-400 ml-6 mt-1">
                                専用チャンネルより取得してください。ただし、<strong className="text-red-400">極端にグロテスクな画像・動画</strong>は専用チャンネルであっても禁止とします。
                            </p>
                        </li>
                        <li>
                            <strong>気軽にメンションできるロールを用意しています。</strong>
                            <p className="text-sm text-gray-400 ml-6 mt-1">
                                専用チャンネルより取得してください。
                            </p>
                        </li>
                    </ol>
                </div>
            </div>

            {/* 禁止・注意事項 */}
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-red-400">🚫 禁止・注意事項</h2>
                <div className="space-y-2 text-gray-300">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>サーバー内での悪口・誹謗中傷、またはプライバシーを侵害する行為</li>
                        <li>チャット内および通話内での荒らし等の迷惑行為</li>
                        <li>NSFW専用チャンネル以外での過度な下ネタ発言、性的・暴力的・グロテスクな画像／動画の添付</li>
                        <li>淫夢・ヒカマニ関連の発言・コンテンツの添付</li>
                        <li>不必要または過度なメンションを送る行為</li>
                        <li>画像ファイル・GIF単体でのリプライ（※リアクションは歓迎です）</li>
                        <li className="font-bold text-red-300">このサーバーにアップロードされた作品をAIモデルの学習に利用すること</li>
                    </ul>
                </div>
            </div>

            {/* フッター */}
            <div className="text-center text-gray-400 text-sm mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <p className="mb-2">
                    利用規約は予告なく改定される場合があります。
                </p>
                <p>
                    📩 規約に関するお問い合わせは運営までお知らせください。
                </p>
                <p className="mt-4 text-gray-300">
                    至らぬ点もありますが、皆さんが安心して創作・交流できる場を目指しています。<br />
                    どうぞよろしくお願いいたします。
                </p>
            </div>
        </div>
    );
}