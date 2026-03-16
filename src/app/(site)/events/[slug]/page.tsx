import {getEvent} from "@/lib/cms";
import {notFound} from "next/navigation";

export default async function EventDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const ev = await getEvent(params.slug);
    if (!ev) return notFound();
    return (<div className="container py-12"><h1 className="text-2xl font-bold mb-4">{ev.title}</h1>
        <div
            className="text-white/80 mb-4">{ev.date} {ev.place ? `@ ${ev.place}` : ""} {ev.space ? `（スペース: ${ev.space}）` : ""}</div>
        {ev.notes ? (
            <div
                className="text-white/80 mb-4 leading-relaxed [&_p]:mb-4 [&_a]:text-accentBlue [&_a]:underline [&_strong]:font-bold [&_em]:italic"
                dangerouslySetInnerHTML={{__html: ev.notes}}
            />
        ) : (
            <p className="text-white/80">イベント詳細（頒布物・決済方法など）</p>
        )}{ev.mapUrl ?
            <a className="underline" href={ev.mapUrl} target="_blank"
               rel="noreferrer">地図を見る</a> : null}{ev.lineup?.length ? (
            <section className="mt-10"><h2 className="text-xl font-semibold mb-3">頒布ラインナップ</h2>
                <ul className="space-y-3">{ev.lineup.slice().sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999)).map((item, i) => {
                    const w: any = item.work;
                    const title = w?.title ?? w?.id ?? "Unknown";
                    const jacket = w?.jacket;
                    const slug = w?.slug ?? w?.id;
                    return (<li key={i} className="flex gap-3 border border-white/10 rounded p-3">{jacket ?
                        <img src={jacket} alt={title} className="w-20 h-20 object-cover rounded"/> :
                        <div className="w-20 h-20 bg-white/5 rounded"/>}
                        <div className="flex-1">
                            <div className="flex items-center gap-2"><a className="font-semibold underline"
                                                                        href={`/works/${slug}`}>{title}</a>{item.isNew ? (
                                <span
                                    className="text-[10px] px-1.5 py-0.5 rounded bg-accentGreen/20 border border-accentGreen/40">NEW</span>) : null}{item.isLimited ? (
                                <span
                                    className="text-[10px] px-1.5 py-0.5 rounded bg-accentRed/20 border border-accentRed/40">LIMITED</span>) : null}
                            </div>
                            {typeof item.price === "number" && (<div
                                className="text-white/80 text-sm mt-1">価格：{item.price.toLocaleString()}円</div>)}{(item.boothUrl || item.sampleUrl) && (
                            <div className="flex flex-wrap gap-2 mt-2 text-sm">{item.boothUrl &&
                                <a className="underline" href={item.boothUrl} target="_blank"
                                   rel="noreferrer">BOOTH</a>}{item.sampleUrl &&
                                <a className="underline" href={item.sampleUrl} target="_blank"
                                   rel="noreferrer">試聴</a>}</div>)}{item.note &&
                            <div
                                className="text-white/70 text-sm mt-1 [&_p]:mb-2 [&_a]:text-accentBlue [&_a]:underline [&_strong]:font-bold [&_em]:italic"
                                dangerouslySetInnerHTML={{__html: item.note}}
                            />}</div>
                    </li>)
                })}</ul>
            </section>) : null}</div>)
}