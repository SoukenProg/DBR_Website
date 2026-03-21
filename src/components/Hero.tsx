import Link from "next/link";
import type {Work, ImageField} from "@/lib/cms";

export function Hero({dbrWork, soukenWork}: { dbrWork?: Work; soukenWork?: Work }) {
    // jacketのURLを取得（オブジェクト形式または文字列形式に対応）
    const getJacketUrl = (jacket?: ImageField | string) => {
        return jacket ? (typeof jacket === 'string' ? jacket : jacket.url) : undefined;
    };

    return (<section className="relative py-20 overflow-hidden">
        <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.15),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(51,170,255,0.12),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(51,255,51,0.1),transparent_40%)]"/>
        <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-widest drop-shadow">
                System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span> / Souken521
            </h1>
            <p className="mt-4 text-white/70">D.B.R. — Deep Beat Realm</p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* System D.B.R. 最新作 */}
                {dbrWork && (
                    <div className="flex flex-col items-center gap-4 p-4 rounded-xl border border-accentRed/30 bg-gradient-to-br from-accentGreen/10 via-accentBlue/10 to-accentRed/10 shadow-glow">
                        <div className="text-sm font-semibold text-accentRed">System D.B.R. 最新作</div>
                        {getJacketUrl(dbrWork.jacket) ? (
                            <img src={getJacketUrl(dbrWork.jacket)} alt={dbrWork.title} className="w-48 h-48 object-cover rounded"/>
                        ) : null}
                        <div className="text-lg font-semibold">{dbrWork.title}</div>
                        <Link href={`/works/${dbrWork.slug}`} className="px-4 py-2 rounded bg-accentRed text-white font-semibold hover:bg-accentRed/80">
                            聴く / 詳細へ
                        </Link>
                    </div>
                )}

                {/* Souken521 最新作 */}
                {soukenWork && (
                    <div className="flex flex-col items-center gap-4 p-4 rounded-xl border border-accentPurple/30 bg-gradient-to-br from-accentPurple/10 to-accentBlue/10 shadow-glow">
                        <div className="text-sm font-semibold text-accentPurple">Souken521 最新作</div>
                        {getJacketUrl(soukenWork.jacket) ? (
                            <img src={getJacketUrl(soukenWork.jacket)} alt={soukenWork.title} className="w-48 h-48 object-cover rounded"/>
                        ) : null}
                        <div className="text-lg font-semibold">{soukenWork.title}</div>
                        <Link href={`/works/${soukenWork.slug}`} className="px-4 py-2 rounded bg-accentPurple text-white font-semibold hover:bg-accentPurple/80">
                            聴く / 詳細へ
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </section>)
}