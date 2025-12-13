export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white bg-gradient-to-r from-accentRed via-accentBlue to-accentGreen bg-clip-text text-transparent">
                    プライバシーポリシー
                </h1>
                <p className="text-lg text-gray-300">
                    System D.B.R. における個人情報の取り扱いについて
                </p>
            </div>

            {/* 基本方針 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentBlue">基本方針</h2>
                <p className="text-gray-300 leading-relaxed">
                    System D.B.R.（以下「当サークル」）は、お客様の個人情報保護の重要性について認識し、
                    個人情報の保護に関する法律（以下「個人情報保護法」）を遵守すると共に、
                    以下のプライバシーポリシー（以下「本ポリシー」）に従い、適切な取扱い及び保護に努めます。
                </p>
            </div>

            {/* 個人情報の定義 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentGreen">個人情報の定義</h2>
                <p className="text-gray-300 leading-relaxed">
                    本ポリシーにおける「個人情報」とは、個人情報保護法第2条第1項により定義された個人情報、
                    すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、メールアドレス、
                    SNSアカウント等の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、
                    それにより特定の個人を識別することができることとなるものを含みます）を指します。
                </p>
            </div>

            {/* 個人情報の収集方法 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentRed">個人情報の収集方法</h2>
                <div className="space-y-3 text-gray-300">
                    <p>当サークルは、以下の場合に個人情報を収集することがあります：</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Discord参加申請フォームの送信時</li>
                        <li>お問い合わせフォームの送信時</li>
                        <li>イベント参加申し込み時</li>
                        <li>その他、当サークルのサービスをご利用いただく際</li>
                    </ul>
                </div>
            </div>

            {/* 個人情報の利用目的 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentBlue">個人情報の利用目的</h2>
                <div className="space-y-3 text-gray-300">
                    <p>収集した個人情報は、以下の目的で利用いたします：</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>サークル内の連絡・情報提供</li>
                        <li>Discord コミュニティの運営管理</li>
                        <li>お問い合わせへの対応</li>
                        <li>イベント・即売会に関する連絡</li>
                        <li>サービス向上のための分析</li>
                    </ul>
                </div>
            </div>

            {/* 第三者への提供 */}
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-red-400">第三者への提供</h2>
                <p className="text-gray-300 leading-relaxed">
                    当サークルは、フォームから取得する情報をサークル内の連絡にのみ使用し、
                    <strong className="text-red-300">法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはありません。</strong>
                </p>
            </div>

            {/* 個人情報の管理 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentGreen">個人情報の管理</h2>
                <p className="text-gray-300 leading-relaxed">
                    当サークルは、個人情報の正確性を保ち、これを安全に管理いたします。
                    個人情報の漏洩、滅失、毀損などを防止するため、必要かつ適切な安全管理措置を実施いたします。
                </p>
            </div>

            {/* Cookie等の使用 */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-accentRed">Cookie等の使用</h2>
                <p className="text-gray-300 leading-relaxed">
                    当サイトでは、ユーザー体験の向上のためCookieを使用する場合があります。
                    Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。
                </p>
            </div>

            {/* お問い合わせ */}
            <div className="bg-gradient-to-br from-accentBlue/10 to-accentRed/10 border border-accentBlue/30 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">お問い合わせ</h2>
                <p className="text-gray-300 leading-relaxed">
                    本ポリシーに関するお問い合わせは、当サークルの公式SNSアカウントまたはDiscordサーバーの運営までご連絡ください。
                </p>
            </div>

            {/* フッター */}
            <div className="text-center text-gray-400 text-sm mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <p className="mb-2">
                    本ポリシーは予告なく改定される場合があります。
                </p>
                <p className="text-gray-300">
                    制定日：2024年1月1日
                </p>
            </div>
        </div>
    );
}