import Image from "next/image";

interface Track {
    title: string;
    artist?: string;
}

interface LineupItemProps {
    index: number;
    title: string;
    slug?: string;
    jacketUrl?: string;
    isNew?: boolean;
    isLimited?: boolean;
    price?: number;
    tracks: Track[];
    note?: string;
    boothUrl?: string;
    sampleUrl?: string;
    embedUrl?: string;
}

// 曲目一覧が10曲程度のときの高さに合わせた固定サイズ
const JACKET_SIZE = 262;

export default function LineupItem({
    index,
    title,
    slug,
    jacketUrl,
    isNew,
    isLimited,
    price,
    tracks,
    note,
    boothUrl,
    sampleUrl,
    embedUrl,
}: LineupItemProps) {
    return (
        <li className="flex items-center gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
            <span className="text-accentRed font-mono text-sm w-8 shrink-0">
                {String(index + 1).padStart(2, '0')}
            </span>
            {jacketUrl && (
                <div
                    className="relative shrink-0 rounded overflow-hidden"
                    style={{width: JACKET_SIZE, height: JACKET_SIZE}}
                >
                    <Image src={jacketUrl} alt={title} fill className="object-cover"/>
                </div>
            )}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <a className="font-semibold text-gray-900 dark:text-white hover:underline" href={`/works/${slug}`}>
                        {title}
                    </a>
                    {isNew && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accentGreen/20 border border-accentGreen/40 text-accentGreen">NEW</span>
                    )}
                    {isLimited && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accentRed/20 border border-accentRed/40 text-accentRed">LIMITED</span>
                    )}
                </div>
                {typeof price === "number" && (
                    <div className="text-gray-500 dark:text-white/60 text-sm mt-1">¥{price.toLocaleString()}</div>
                )}
                <div className="mt-2">
                    <span className="text-[12px] text-gray-400 dark:text-white/40 uppercase tracking-wider">曲目一覧</span>
                    <ol className="mt-1 space-y-0.5">
                        {tracks.map((track, ti) => (
                            <li key={ti} className="flex gap-2 text-sm text-gray-500 dark:text-white/60">
                                <span className="text-gray-400 dark:text-white/30 font-mono w-4 shrink-0">{ti + 1}.</span>
                                <span>{track.title}{track.artist ? ` / ${track.artist}` : ""}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                {note && (
                    <div
                        className="text-gray-500 dark:text-white/50 text-xs mt-1 [&_p]:mb-1 [&_a]:text-accentBlue [&_a]:underline"
                        dangerouslySetInnerHTML={{__html: note}}
                    />
                )}
                {(boothUrl || sampleUrl) && (
                    <div className="flex gap-3 mt-2 text-sm">
                        {boothUrl && (
                            <a className="text-accentBlue underline" href={boothUrl} target="_blank" rel="noreferrer">BOOTH</a>
                        )}
                        {sampleUrl && (
                            <a className="text-accentBlue underline" href={sampleUrl} target="_blank" rel="noreferrer">試聴</a>
                        )}
                    </div>
                )}
                {embedUrl && (
                    <div className="relative aspect-video mt-3 rounded overflow-hidden">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={embedUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </li>
    );
}
