import {getEvent} from "@/lib/cms";
import {notFound} from "next/navigation";
import Image from "next/image";

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
                            className="text-white/80 leading-relaxed [&_p]:mb-4 [&_a]:text-accentBlue [&_a]:underline [&_strong]:font-bold [&_em]:italic"
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
                                <dt className="w-28 shrink-0 text-white/40 uppercase tracking-wider text-xs pt-0.5">Title</dt>
                                <dd className="text-white">{ev.title}</dd>
                            </div>
                            {(ev.date || ev.enddate) && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-white/40 uppercase tracking-wider text-xs pt-0.5">Date</dt>
                                    <dd className="text-white">
                                        {formatDate(ev.date)}{ev.enddate ? ` ~ ${formatDate(ev.enddate)}` : ""}
                                    </dd>
                                </div>
                            )}
                            {ev.place && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-white/40 uppercase tracking-wider text-xs pt-0.5">Venue</dt>
                                    <dd className="text-white">{ev.place}</dd>
                                </div>
                            )}
                            {ev.space && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-white/40 uppercase tracking-wider text-xs pt-0.5">Space</dt>
                                    <dd className="text-white">{ev.space}</dd>
                                </div>
                            )}
                            {ev.mapUrl && (
                                <div className="flex gap-4">
                                    <dt className="w-28 shrink-0 text-white/40 uppercase tracking-wider text-xs pt-0.5">Map</dt>
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
                                return (
                                    <li key={i} className="flex gap-4 border-b border-white/10 pb-4">
                                        <span className="text-accentRed font-mono text-sm w-8 shrink-0 pt-1">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        {itemJacketUrl && (
                                            <img
                                                src={itemJacketUrl}
                                                alt={title}
                                                className="w-16 h-16 object-cover rounded shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <a className="font-semibold text-white hover:underline" href={`/works/${slug}`}>
                                                    {title}
                                                </a>
                                                {item.isNew && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accentGreen/20 border border-accentGreen/40 text-accentGreen">NEW</span>
                                                )}
                                                {item.isLimited && (
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-accentRed/20 border border-accentRed/40 text-accentRed">LIMITED</span>
                                                )}
                                            </div>
                                            {typeof item.price === "number" && (
                                                <div className="text-white/60 text-sm mt-1">¥{item.price.toLocaleString()}</div>
                                            )}
                                            {(() => {
                                                const tracks: { title: string; artist?: string }[] =
                                                    w?.tracks && w.tracks.length > 0
                                                        ? w.tracks
                                                        : [{title: title}];
                                                return (
                                                    <div className="mt-2">
                                                        <span className="text-[10px] text-white/40 uppercase tracking-wider">曲目一覧</span>
                                                        <ol className="mt-1 space-y-0.5">
                                                            {tracks.map((track, ti) => (
                                                                <li key={ti} className="flex gap-2 text-xs text-white/60">
                                                                    <span className="text-white/30 font-mono w-4 shrink-0">{ti + 1}.</span>
                                                                    <span>{track.title}{track.artist ? ` / ${track.artist}` : ""}</span>
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                );
                                            })()}
                                            {item.note && (
                                                <div
                                                    className="text-white/50 text-xs mt-1 [&_p]:mb-1 [&_a]:text-accentBlue [&_a]:underline"
                                                    dangerouslySetInnerHTML={{__html: item.note}}
                                                />
                                            )}
                                            {(item.boothUrl || item.sampleUrl) && (
                                                <div className="flex gap-3 mt-2 text-sm">
                                                    {item.boothUrl && (
                                                        <a className="text-accentBlue underline" href={item.boothUrl} target="_blank" rel="noreferrer">BOOTH</a>
                                                    )}
                                                    {item.sampleUrl && (
                                                        <a className="text-accentBlue underline" href={item.sampleUrl} target="_blank" rel="noreferrer">試聴</a>
                                                    )}
                                                </div>
                                            )}
                                            {item.youtubeUrl && (
                                                <div className="relative aspect-video mt-3 rounded overflow-hidden">
                                                    <iframe
                                                        className="absolute inset-0 w-full h-full"
                                                        src={toEmbedUrl(item.youtubeUrl)}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </li>
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
                                <li key={i} className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-3">
                                    <span className="text-white/40 text-xs w-32 shrink-0">{c.role}</span>
                                    <span className="text-white font-semibold">{c.name}</span>
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
