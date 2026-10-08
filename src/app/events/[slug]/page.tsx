import {getEvent} from "@/lib/cms";
import {notFound} from "next/navigation";
import Image from "next/image";
import LineupItem from "@/components/LineupItem";

export default async function EventDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const ev = await getEvent(params.slug);
    if (!ev) return notFound();

    const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('sv-SE', {timeZone: 'Asia/Tokyo'}) : "";

    const jacketUrl = ev.jacket
        ? (typeof ev.jacket === 'string' ? ev.jacket : ev.jacket.url)
        : undefined;

    const toEmbedUrl = (url: string) => {
        const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        return m ? `https://www.youtube.com/embed/${m[1]}` : url;
    };

    const sortedLineup = ev.lineup
        ? [...ev.lineup].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
        : [];

    return (
        <div>
            {/* Hero */}
            <div className="relative h-64 md:h-96 overflow-hidden bg-black">
                {jacketUrl && (
                    <Image
                        src={jacketUrl}
                        alt={ev.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-black/80 to-transparent">
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">{ev.title}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

                {/* INTRODUCTION */}
                {ev.notes && (
                    <section>
                        <h2 className="text-xs tracking-widest text-accentRed font-semibold mb-4">INTRODUCTION</h2>
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{__html: ev.notes}}
                        />
                    </section>
                )}

                {/* SPEC */}
                <section>
                    <h2 className="text-xs tracking-widest text-accentRed font-semibold mb-6">SPEC</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {jacketUrl && (
                            <div className="relative aspect-square max-w-xs mx-auto md:mx-0 w-full">
                                <Image
                                    src={jacketUrl}
                                    alt={ev.title}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        )}
                        <dl className="space-y-4 text-sm">
                            <div className="flex gap-4">
                                <dt className="w-28 shrink-0 text-gray-400 dark:text-white/40 uppercase tracking-wider text-xs pt-0.5">Title</dt>
                                <dd className="text-gray-900 dark:text-white">{ev.title}</dd>
                            </div>
                            {(ev.date || ev.enddate) && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-gray-400 dark:text-white/40 uppercase tracking-wider text-xs pt-0.5">Date</dt>
                                    <dd className="text-gray-900 dark:text-white">
                                        {formatDate(ev.date)}{ev.enddate ? ` ~ ${formatDate(ev.enddate)}` : ""}
                                    </dd>
                                </div>
                            )}
                            {ev.place && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-gray-400 dark:text-white/40 uppercase tracking-wider text-xs pt-0.5">Venue</dt>
                                    <dd className="text-gray-900 dark:text-white">{ev.place}</dd>
                                </div>
                            )}
                            {ev.space && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-gray-400 dark:text-white/40 uppercase tracking-wider text-xs pt-0.5">Space</dt>
                                    <dd className="text-gray-900 dark:text-white">{ev.space}</dd>
                                </div>
                            )}
                            {ev.mapUrl && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-gray-400 dark:text-white/40 uppercase tracking-wider text-xs pt-0.5">Map</dt>
                                    <dd>
                                        <a className="text-accentBlue underline" href={ev.mapUrl} target="_blank" rel="noreferrer">地図を見る</a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </section>

                {/* LINEUP */}
                {sortedLineup.length > 0 && (
                    <section>
                        <h2 className="text-xs tracking-widest text-accentRed font-semibold mb-6">LINEUP</h2>
                        <ol className="space-y-4">
                            {sortedLineup.map((item, i) => {
                                const w: any = item.work;
                                const title = w?.title ?? w?.id ?? "Unknown";
                                const rawJacket = w?.jacket;
                                const itemJacketUrl = rawJacket
                                    ? (typeof rawJacket === 'string' ? rawJacket : rawJacket.url)
                                    : undefined;
                                const slug = w?.slug ?? w?.id;
                                const tracks: { title: string; artist?: string }[] =
                                    w?.tracks && w.tracks.length > 0
                                        ? w.tracks
                                        : [{title: title}];
                                return (
                                    <LineupItem
                                        key={i}
                                        index={i}
                                        title={title}
                                        slug={slug}
                                        jacketUrl={itemJacketUrl}
                                        isNew={item.isNew}
                                        isLimited={item.isLimited}
                                        price={item.price}
                                        tracks={tracks}
                                        note={item.note}
                                        boothUrl={item.boothUrl}
                                        sampleUrl={item.sampleUrl}
                                        embedUrl={item.youtubeUrl ? toEmbedUrl(item.youtubeUrl) : undefined}
                                    />
                                );
                            })}
                        </ol>
                    </section>
                )}

                {/* CREDIT */}
                {ev.credits && ev.credits.length > 0 && (
                    <section>
                        <h2 className="text-xs tracking-widest text-accentRed font-semibold mb-6">CREDIT</h2>
                        <ul className="space-y-3">
                            {ev.credits.map((c, i) => (
                                <li key={i} className="flex flex-wrap items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-3">
                                    <span className="text-gray-400 dark:text-white/40 text-xs w-32 shrink-0">{c.role}</span>
                                    <span className="text-gray-900 dark:text-white font-semibold">{c.name}</span>
                                    {c.url && (
                                        <a
                                            href={c.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-accentBlue border border-accentBlue/40 px-2 py-0.5 rounded hover:bg-accentBlue/10 transition-colors"
                                        >
                                            Website
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>
        </div>
    );
}
