type Platform = { label: string; url: string; iconKey?: string };
const ICONS: Record<string, string> = {
    spotify: "🎵",
    applemusic: "🍎",
    booth: "🛍️",
    bandcamp: "🏕️",
    soundcloud: "☁️",
    youtube: "▶️",
    x: "𝕏",
    link: "🔗"
};

function iconFor(key?: string) {
    if (!key) return ICONS.link;
    return ICONS[key] ?? ICONS.link
}

export function PlatformsList({items}: { items?: Platform[] }) {
    if (!items || items.length === 0) return null;
    return (<div className="mt-6 flex flex-wrap gap-2">{items.map(p => (
        <a key={p.url} href={p.url} target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:border-white/40"><span
            aria-hidden>{iconFor(p.iconKey)}</span><span className="text-sm">{p.label}</span></a>))}</div>)
}