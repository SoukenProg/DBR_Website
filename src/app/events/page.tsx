import {listEvents} from "@/lib/cms";
import {EventCard} from "@/components/EventCard";

export default async function EventsPage() {
    const events = await listEvents();
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Events
                </h1>
                <p className="text-lg text-gray-300">
                    即売会・音楽イベントへの出展情報
                </p>
            </div>

            {/* イベント一覧 */}
            <div className="grid md:grid-cols-2 gap-4">
                {events.map(e => (<EventCard key={e.slug} event={e}/>))}
            </div>
        </div>
    );
}