import {listWorks} from "@/lib/cms";
import {WorkCard} from "@/components/WorkCard";

export default async function WorksPage() {
    const works = await listWorks();
    return (<div className="container py-12"><h1 className="text-2xl font-bold mb-6">Works</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{works.map(w => (
            <WorkCard key={w.slug} work={w}/>))}</div>
    </div>)
}