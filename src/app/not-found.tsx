import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gray-900 dark:text-white">
                    404
                </h1>
                <p className="text-2xl md:text-3xl font-bold mb-4 text-gray-700 dark:text-gray-300">
                    Page Not Found
                </p>
                <p className="text-lg text-gray-400">
                    お探しのページが見つかりませんでした
                </p>
            </div>

            {/* エラーメッセージ */}
            <div className="bg-gradient-to-br from-accentRed/10 to-accentBlue/10 border border-accentRed/30 rounded-lg p-8 mb-8 text-center">
                <p className="text-gray-300 leading-relaxed mb-6">
                    指定されたURLのページは存在しないか、削除された可能性があります。<br />
                    URLをご確認いただくか、以下のリンクからサイト内をご覧ください。
                </p>
            </div>

            {/* ナビゲーションリンク */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Link
                    href="/"
                    className="group border border-accentBlue/30 bg-accentBlue/10 rounded-lg p-6 hover:border-accentBlue hover:bg-accentBlue/20 transition-all duration-300 text-center"
                >
                    <div className="text-4xl mb-2">🏠</div>
                    <div className="font-semibold text-white group-hover:text-accentBlue transition-colors">ホームページ</div>
                    <div className="text-sm text-gray-300 mt-1">トップページに戻る</div>
                </Link>

                <Link
                    href="/works"
                    className="group border border-accentRed/30 bg-accentRed/10 rounded-lg p-6 hover:border-accentRed hover:bg-accentRed/20 transition-all duration-300 text-center"
                >
                    <div className="text-4xl mb-2">🎵</div>
                    <div className="font-semibold text-white group-hover:text-accentRed transition-colors">作品一覧</div>
                    <div className="text-sm text-gray-300 mt-1">楽曲・制作物を見る</div>
                </Link>

                <Link
                    href="/events"
                    className="group border border-accentGreen/30 bg-accentGreen/10 rounded-lg p-6 hover:border-accentGreen hover:bg-accentGreen/20 transition-all duration-300 text-center"
                >
                    <div className="text-4xl mb-2">📅</div>
                    <div className="font-semibold text-white group-hover:text-accentGreen transition-colors">イベント情報</div>
                    <div className="text-sm text-gray-300 mt-1">出展イベントを見る</div>
                </Link>

                <Link
                    href="/discord"
                    className="group border border-accentBlue/30 bg-accentBlue/10 rounded-lg p-6 hover:border-accentBlue hover:bg-accentBlue/20 transition-all duration-300 text-center"
                >
                    <div className="text-4xl mb-2">💬</div>
                    <div className="font-semibold text-white group-hover:text-accentBlue transition-colors">Discord</div>
                    <div className="text-sm text-gray-300 mt-1">コミュニティに参加</div>
                </Link>
            </div>

            {/* フッター */}
            <div className="text-center text-gray-400 text-sm mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <p>
                    System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span>
                </p>
            </div>
        </div>
    );
}
