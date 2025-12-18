import Link from "next/link";

export function WorkCard({work}: {
    work: { title: string; slug: string; jacket?: string; releaseDate?: string; tags?: string[]; project?: string }
}) {
    return (
        <Link
            href={`/works/${work.slug}`}
            className="group border border-gray-800 rounded-lg overflow-hidden hover:border-accentBlue/50 transition-all duration-300 bg-gray-900/50"
        >
            {work.jacket ? (
                <img src={work.jacket} alt={work.title} className="aspect-square object-cover"/>
            ) : (
                <div className="aspect-square bg-gradient-to-br from-accentRed/10 to-accentBlue/10"/>
            )}
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="font-semibold group-hover:text-accentBlue transition-colors">{work.title}</div>
                    {work.project && (
                        <span className="text-[10px] px-2 py-0.5 rounded border bg-gray-800/80 border-gray-600 text-gray-300">
                            {work.project}
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-400 mt-1">{work.releaseDate ?? ""}</div>
                {work?.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {work.tags.slice(0, 3).map((t, i) => {
                            const colors = [
                                'bg-accentRed/20 border-accentRed/40 text-accentRed',
                                'bg-accentBlue/20 border-accentBlue/40 text-accentBlue',
                                'bg-accentGreen/20 border-accentGreen/40 text-accentGreen',
                            ];
                            return (
                                <span
                                    key={t}
                                    className={`text-[10px] px-2 py-1 rounded border ${colors[i % colors.length]}`}
                                >
                                    {t}
                                </span>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </Link>
    );
}