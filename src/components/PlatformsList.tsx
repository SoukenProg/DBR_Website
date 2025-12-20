type Platform = { label: string; url: string; iconKey?: string | string[] };
const ICONS: Record<string, string> = {
    spotify: "🎵",
    applemusic: "🍎",
    booth: "🛍️",
    bandcamp: "🏕️",
    soundcloud: "☁️",
    youtube: "▶️",
    niconico: "😊",
    x: "𝕏",
    link: "🔗"
};

function iconFor(key?: string | string[]) {
    if (!key) return ICONS.link;
    // 配列の場合は最初の要素を使用
    const iconKey = Array.isArray(key) ? key[0] : key;
    if (!iconKey) return ICONS.link;
    // 小文字に変換してマッチング
    const normalizedKey = iconKey.toLowerCase();
    return ICONS[normalizedKey] ?? ICONS.link;
}

export function PlatformsList({items}: { items?: Platform[] }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="mt-6 flex flex-wrap gap-3">
            {items.map((p, i) => {
                const colors = [
                    'border-accentRed/40 bg-accentRed/10 hover:border-accentRed hover:bg-accentRed/20',
                    'border-accentBlue/40 bg-accentBlue/10 hover:border-accentBlue hover:bg-accentBlue/20',
                    'border-accentGreen/40 bg-accentGreen/10 hover:border-accentGreen hover:bg-accentGreen/20',
                ];
                return (
                    <a
                        key={p.url}
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded border transition-all duration-300 ${colors[i % colors.length]}`}
                    >
                        <span aria-hidden>{iconFor(p.iconKey)}</span>
                        <span className="text-sm font-medium">{p.label}</span>
                    </a>
                );
            })}
        </div>
    );
}