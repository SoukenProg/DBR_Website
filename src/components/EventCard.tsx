import Link from "next/link";

export function EventCard({event}: { event: { title: string; slug: string; date?: string; place?: string } }) {
    return (
        <Link
            href={`/events/${event.slug}`}
            className="group border border-accentRed/30 bg-accentRed/10 rounded-lg p-4 hover:border-accentRed hover:bg-accentRed/20 transition-all duration-300"
        >
            <div className="font-semibold text-white group-hover:text-accentRed transition-colors">{event.title}</div>
            <div className="text-sm text-gray-300 mt-1">
                {event.date} {event.place ? `@ ${event.place}` : ""}
            </div>
        </Link>
    );
}