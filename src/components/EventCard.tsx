import Link from "next/link";
import type {ProjectField} from "@/lib/cms";

export function EventCard({event}: { event: { title: string; slug: string; date?: string; enddate?: string; place?: string; project?: ProjectField | ProjectField[] | string } }) {
    // projectから名前を取得（配列、オブジェクト、文字列に対応）
    const getProjectName = () => {
        if (!event.project) return undefined;
        if (typeof event.project === 'string') return event.project;
        if (Array.isArray(event.project)) {
            const first = event.project[0];
            if (!first) return undefined;
            if (typeof first === 'string') return first;
            return first.name;
        }
        return event.project.name;
    };
    const projectName = getProjectName();
    const formatDate = (d?: string) => d ? d.slice(0, 10) : "";

    return (
        <Link
            href={`/events/${event.slug}`}
            className="group border border-accentRed/30 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 hover:border-accentRed transition-all duration-300"
        >
            <div className="flex items-center gap-2">
                <div className="font-semibold text-gray-900 dark:text-white">{event.title}</div>
                {projectName && (
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        projectName === "Souken521"
                            ? "bg-accentPurple/30 border-accentPurple/50 text-accentPurple"
                            : "bg-accentRed/30 border-accentRed/50 text-white"
                    }`}>
                        {projectName}
                    </span>
                )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(event.date)}{event.enddate ? ` ~ ${formatDate(event.enddate)}` : ""} {event.place ? `@ ${event.place}` : ""}
            </div>
        </Link>
    );
}
