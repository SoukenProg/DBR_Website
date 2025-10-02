type LinkItem = { label: string; url: string };

export function SocialLinks({items}: { items: LinkItem[] }) {
    return (<div className="flex flex-wrap gap-3">{items.map(l => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
           className="px-3 py-1 rounded border border-white/15 hover:border-white/40">{l.label}</a>))}</div>)
}