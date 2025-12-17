import {listWorks} from "@/lib/cms";
import {WorkCard} from "@/components/WorkCard";

export default async function WorksPage() {
    const works = await listWorks();
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Works
                </h1>
                <p className="text-lg text-gray-300">
                    制作物まとめ
                </p>
            </div>

            {/* 作品一覧 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {works.map(w => (<WorkCard key={w.slug} work={w}/>))}
            </div>
        </div>
    );
}