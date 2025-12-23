import Link from "next/link";
import type {ProjectField, ImageField} from "@/lib/cms";
import {formatDate} from "@/lib/formatDate";

export function WorkCard({work}: {
    work: { title: string; slug: string; jacket?: ImageField | string; releaseDate?: string; tags?: any[]; project?: ProjectField | ProjectField[] | string }
}) {
    // projectから名前を取得（配列、オブジェクト、文字列に対応）
    const getProjectName = () => {
        if (!work.project) return undefined;
        if (typeof work.project === 'string') return work.project;
        if (Array.isArray(work.project)) {
            const first = work.project[0];
            if (!first) return undefined;
            if (typeof first === 'string') return first;
            return first.name;
        }
        return work.project.name;
    };
    const projectName = getProjectName();

    // jacketのURLを取得（オブジェクト形式または文字列形式に対応）
    const jacketUrl = work.jacket ? (typeof work.jacket === 'string' ? work.jacket : work.jacket.url) : undefined;

    return (
        <Link
            href={`/works/${work.slug}`}
            className="group border border-gray-800 rounded-lg overflow-hidden hover:border-accentBlue/50 transition-all duration-300 bg-gray-900/50"
        >
            {jacketUrl ? (
                <img src={jacketUrl} alt={work.title} className="aspect-square object-cover"/>
            ) : (
                <div className="aspect-square bg-gradient-to-br from-accentRed/10 to-accentBlue/10"/>
            )}
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="font-semibold group-hover:text-accentBlue transition-colors">{work.title}</div>
                    {projectName && (
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            projectName === "Souken521"
                                ? "bg-accentPurple/20 border-accentPurple/50 text-accentPurple"
                                : "bg-accentBlue/20 border-accentBlue/50 text-accentBlue"
                        }`}>
                            {projectName}
                        </span>
                    )}
                </div>
                <div className="text-xs text-gray-400 mt-1">{formatDate(work.releaseDate)}</div>
                {work?.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {work.tags.slice(0, 3).map((t, i) => {
                            // tagsがオブジェクトの場合と文字列の場合に対応
                            const tagName = typeof t === 'string' ? t : (t as any).name || t;
                            const tagKey = typeof t === 'string' ? t : (t as any).slug || (t as any).id || tagName;

                            const colors = [
                                'bg-accentRed/20 border-accentRed/40 text-accentRed',
                                'bg-accentBlue/20 border-accentBlue/40 text-accentBlue',
                                'bg-accentGreen/20 border-accentGreen/40 text-accentGreen',
                            ];
                            return (
                                <span
                                    key={tagKey}
                                    className={`text-[10px] px-2 py-1 rounded border ${colors[i % colors.length]}`}
                                >
                                    {tagName}
                                </span>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </Link>
    );
}