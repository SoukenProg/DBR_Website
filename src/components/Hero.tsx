import Link from "next/link";

export function Hero({work}: { work?: { title: string; slug: string; jacket?: string } }) {
    return (<section className="relative py-20 overflow-hidden">
        <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,51,51,0.15),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(51,170,255,0.12),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(51,255,51,0.1),transparent_40%)]"/>
        <div className="container text-center"><h1
            className="text-4xl md:text-6xl font-extrabold tracking-widest drop-shadow">System <span
            className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span
            className="text-accentRed">R.</span></h1>
            <p className="mt-4 text-white/70">Dual Blades × Rhythm — 音と光のサークル</p>{work && (<div
            className="mt-10 inline-flex flex-col items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 shadow-glow">{work.jacket ? (
            <img src={work.jacket} alt={work.title} className="w-48 h-48 object-cover rounded"/>) : null}
            <div className="text-lg">最新作：{work.title}</div>
            <Link href={`/works/${work.slug}`} className="px-4 py-2 rounded bg-white text-black font-semibold">聴く /
                詳細へ</Link></div>)}</div>
    </section>)
}