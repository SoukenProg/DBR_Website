import {getWork} from "@/lib/cms";
import {notFound} from "next/navigation";
import {PlatformsList} from "@/components/PlatformsList";
import type {ProjectField} from "@/lib/cms";
import {formatDate} from "@/lib/formatDate";

// projectから名前を取得（配列、オブジェクト、文字列に対応）
function getProjectName(project?: ProjectField | ProjectField[] | string): string | undefined {
    if (!project) return undefined;
    if (typeof project === 'string') return project;
    if (Array.isArray(project)) {
        const first = project[0];
        if (!first) return undefined;
        if (typeof first === 'string') return first;
        return first.name;
    }
    return project.name;
}

export default async function WorkDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const work = await getWork(params.slug);
    if (!work) return notFound();

    // jacketのURLを取得（オブジェクト形式または文字列形式に対応）
    const jacketUrl = work.jacket ? (typeof work.jacket === 'string' ? work.jacket : work.jacket.url) : undefined;
    const projectName = getProjectName(work.project);

    return (
        <div className="container py-12 max-w-4xl mx-auto">
            {/* タイトルとメタ情報 */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{work.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    {work.releaseDate && <span>{formatDate(work.releaseDate)}</span>}
                    {projectName && (
                        <span className={`px-2 py-0.5 rounded border ${
                            projectName === "Souken521"
                                ? "bg-accentPurple/20 border-accentPurple/50 text-accentPurple"
                                : "bg-accentBlue/20 border-accentBlue/50 text-accentBlue"
                        }`}>
                            {projectName}
                        </span>
                    )}
                </div>
            </div>

            {/* ジャケット画像 */}
            {jacketUrl ? (
                <div className="mb-8">
                    <img
                        src={jacketUrl}
                        alt={work.title}
                        className="w-full max-w-md rounded-lg shadow-lg"
                    />
                </div>
            ) : null}

            {/* 説明文 */}
            {work.description && (
                <div className="mb-8">
                    <div
                        className="text-white/80 leading-relaxed [&_p]:mb-4 [&_a]:text-accentBlue [&_a]:underline [&_strong]:font-bold [&_em]:italic"
                        dangerouslySetInnerHTML={{__html: work.description}}
                    />
                </div>
            )}

            {/* タグ */}
            {Array.isArray(work.tags) && work.tags.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-semibold mb-3 text-white/90">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {work.tags.map((t, i) => {
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
                                    className={`text-sm px-3 py-1.5 rounded border ${colors[i % colors.length]}`}
                                >
                                    {tagName}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 配信・頒布リンク */}
            <div>
                <h2 className="font-semibold mb-3 text-white/90">配信・頒布リンク</h2>
                <PlatformsList items={work.platforms}/>
            </div>
        </div>
    )
}