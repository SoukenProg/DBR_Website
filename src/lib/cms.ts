type Platform = { label: string; url: string; iconKey?: string | string[] };

// microCMSの画像フィールド
export type ImageField = {
    url: string;
    height?: number;
    width?: number;
};

// microCMSのセレクトフィールドはオブジェクト形式または配列形式で返ってくる
export type ProjectField = {
    id: string;
    name: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
};

export type Work = {
    title: string;
    slug: string;
    jacket?: ImageField | string; // オブジェクト形式または文字列形式
    releaseDate?: string;
    description?: string;
    tags?: string[] | any[]; // 文字列配列またはオブジェクト配列
    platforms?: Platform[];
    project?: ProjectField | ProjectField[]; // 配列形式もサポート
};

export type EventLineupItem = {
    work: Work | { id: string; slug?: string; title?: string; jacket?: string };
    price?: number;
    isNew?: boolean;
    isLimited?: boolean;
    boothUrl?: string;
    sampleUrl?: string;
    note?: string;
    order?: number;
};

export type Event = {
    title: string;
    slug: string;
    date?: string;
    place?: string;
    space?: string;
    mapUrl?: string;
    notes?: string;
    lineup?: EventLineupItem[];
    project?: ProjectField | ProjectField[]; // 配列形式もサポート
};

const MOCK = {
    works: [
        {
            title: "Rival Sabers - Prototype",
            slug: "rival-sabers-prototype",
            releaseDate: "2025-08-15",
            tags: ["future-bass", "game-ready"],
            platforms: [
                {label: "YouTube", url: "https://youtu.be/xxxxxxxx", iconKey: "youtube"},
                {label: "BOOTH", url: "https://booth.pm/ja/items/xxxxxxxx", iconKey: "booth"}
            ],
            project: {id: "system-dbr", name: "System D.B.R.", slug: "system-dbr"}
        },
        {
            title: "Personal Track",
            slug: "personal-track",
            releaseDate: "2025-07-10",
            tags: ["ambient", "experimental"],
            platforms: [
                {label: "SoundCloud", url: "https://soundcloud.com/track", iconKey: "soundcloud"}
            ],
            project: {id: "souken521", name: "Souken521", slug: "souken521"}
        }
    ] as Work[],
    events: [
        {
            title: "ComicVket 2025 Autumn",
            slug: "comicvket-2025-autumn",
            date: "2025-11-03",
            place: "オンライン",
            space: "A-01",
            lineup: [
                {
                    work: {title: "Rival Sabers - Prototype", slug: "rival-sabers-prototype"},
                    price: 1500,
                    isNew: true,
                    boothUrl: "https://booth.pm/ja/items/xxxxxxxx",
                    order: 1
                }
            ],
            project: {id: "system-dbr", name: "System D.B.R.", slug: "system-dbr"}
        }
    ] as Event[],
    links: [
        {label: "X", url: "https://x.com"},
        {label: "YouTube", url: "https://youtube.com"},
        {label: "BOOTH", url: "https://booth.pm"}
    ]
};

function hasMicroCMSEnv() {
    return !!process.env.MICROCMS_SERVICE_DOMAIN && !!process.env.MICROCMS_API_KEY;
}

export async function getLatestWork(): Promise<Work | undefined> {
    if (!hasMicroCMSEnv()) return MOCK.works[0];
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?limit=1&orders=-releaseDate`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents?.[0];
}

export async function listWorks(): Promise<Work[]> {
    if (!hasMicroCMSEnv()) return MOCK.works;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?orders=-releaseDate`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents ?? [];
}

export async function getWork(slug: string): Promise<Work | undefined> {
    if (!hasMicroCMSEnv()) return MOCK.works.find(w => w.slug === slug);
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?filters=slug[equals]${slug}&limit=1`;
    const res = await fetch(endpoint, {headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!}});
    if (!res.ok) return undefined;
    const json = await res.json();
    return json?.contents?.[0];
}

export async function listEvents(): Promise<Event[]> {
    if (!hasMicroCMSEnv()) return MOCK.events;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/event?orders=date`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents ?? [];
}

export async function getEvent(slug: string): Promise<Event | undefined> {
    if (!hasMicroCMSEnv()) return MOCK.events.find(e => e.slug === slug);
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/event?filters=slug[equals]${slug}&depth=2&limit=1`;
    const res = await fetch(endpoint, {headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!}});
    if (!res.ok) return undefined;
    const json = await res.json();
    return json?.contents?.[0];
}

export async function listLinks(): Promise<{ label: string; url: string }[]> {
    if (!hasMicroCMSEnv()) return MOCK.links;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/link`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents ?? [];
}
