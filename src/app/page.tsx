import {Hero} from "@/components/Hero";
import {getLatestWork, listEvents, listLinks} from "@/lib/cms";
import {EventCard} from "@/components/EventCard";
import {SocialLinks} from "@/components/SocialLinks";
import Link from "next/link";

export default async function HomePage() {
    const [work, events, links] = await Promise.all([getLatestWork(), listEvents(), listLinks()]);
    const upcoming = events?.[0];
    return (<div><Hero work={work}/>
        <section className="container py-12"><h2 className="text-xl font-bold mb-4">サークルの紹介</h2><p
            className="text-white/80">System D.B.R. は、リズムゲーム文脈に合うダンスミュージックとビジュアルを制作するサークルです。ダーク基調に赤・青・緑のグロー、Dual
            Bladesモチーフを軸に展開します。</p></section>
        <section className="container py-12"><h2 className="text-xl font-bold mb-4">主催プロフィール（要約）</h2><p
            className="text-white/80">Souken521。作編曲／サウンドデザイン／3D & Motion。詳しくは <Link href="/about"
                                                                                                   className="underline">About</Link> へ。
        </p></section>
        <section className="container py-12"><h2 className="text-xl font-bold mb-4">イベント出展（直近）</h2>{upcoming ?
            <EventCard event={upcoming}/> : <div className="text-white/60">現在予定はありません。</div>}
            <div className="mt-3"><Link className="underline" href="/events">すべてのイベントを見る</Link></div>
        </section>
        <section className="container py-12"><h2 className="text-xl font-bold mb-4">Discord 参加案内</h2><p
            className="text-white/80">制作進捗共有、フィードバック、先行公開など。興味があれば <Link href="/discord"
                                                                                                  className="underline">参加希望フォーム</Link> からどうぞ。
        </p></section>
        <section className="container py-12"><h2 className="text-xl font-bold mb-4">各種サービス</h2><SocialLinks
            items={links}/></section>
    </div>)
}