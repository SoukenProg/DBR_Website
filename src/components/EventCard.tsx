import Link from "next/link";

export function EventCard({event}: { event: { title: string; slug: string; date?: string; place?: string } }) {
    return (<Link href={`/events/${event.slug}`}
                  className="group border border-white/10 rounded-lg p-3 hover:border-white/30">
        <div className="font-semibold group-hover:underline">{event.title}</div>
        <div className="text-sm text-white/70">{event.date} {event.place ? `@ ${event.place}` : ""}</div>
    </Link>)
}