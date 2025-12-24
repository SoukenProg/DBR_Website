import {listEvents} from "@/lib/cms";
import {EventCard} from "@/components/EventCard";
import {ProjectFilter} from "@/components/ProjectFilter";

export default async function EventsPage() {
    const events = await listEvents();
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* ヘッダーセクション */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Events
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    即売会・音楽イベントへの出展情報
                </p>
            </div>

            {/* イベント一覧 */}
            <ProjectFilter
                items={events}
                itemLabel="イベント"
                gridCols="md:grid-cols-2"
            >
                {events.map(event => <EventCard key={event.slug} event={event}/>)}
            </ProjectFilter>
        </div>
    );
}