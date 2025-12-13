type LinkItem = { label: string; url: string };

export function SocialLinks({items}: { items: LinkItem[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((link, index) => {
                const colors = [
                    'from-accentRed/20 to-accentRed/5 border-accentRed/40 hover:border-accentRed',
                    'from-accentBlue/20 to-accentBlue/5 border-accentBlue/40 hover:border-accentBlue',
                    'from-accentGreen/20 to-accentGreen/5 border-accentGreen/40 hover:border-accentGreen',
                ];
                const colorClass = colors[index % colors.length];

                return (
                    <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`group relative px-6 py-4 rounded-lg border bg-gradient-to-br ${colorClass} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    >
                        <span className="text-white font-semibold group-hover:text-white/90 transition-colors">
                            {link.label}
                        </span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all">
                            →
                        </span>
                    </a>
                );
            })}
        </div>
    );
}