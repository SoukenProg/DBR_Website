import Link from "next/link";

export function EventCard({event}: { event: { title: string; slug: string; date?: string; place?: string; project?: string } }) {
    return (
        <Link
            href={`/events/${event.slug}`}
            className="group border border-accentRed/30 bg-accentRed/10 rounded-lg p-4 hover:border-accentRed hover:bg-accentRed/20 transition-all duration-300"
        >
            <div className="flex items-center gap-2">
                <div className="font-semibold text-white group-hover:text-accentRed transition-colors">{event.title}</div>
                {event.project && (
                    <span className="text-[10px] px-2 py-0.5 rounded border bg-accentRed/30 border-accentRed/50 text-white">
                        {event.project}
                    </span>
                )}
            </div>
            <div className="text-sm text-gray-300 mt-1">
                {event.date} {event.place ? `@ ${event.place}` : ""}
            </div>
        </Link>
    );
}