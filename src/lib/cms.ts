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

export type WorkTrack = {
    title: string;
    artist?: string;
};

export type Work = {
    title: string;
    slug: string;
    jacket?: ImageField | string; // オブジェクト形式または文字列形式
    releaseDate?: string;
    description?: string;
    tracks?: WorkTrack[];
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
    youtubeUrl?: string;
    note?: string;
    order?: number;
};

export type EventCredit = {
    role: string;
    name: string;
    url?: string;
};

export type Event = {
    title: string;
    slug: string;
    date?: string;
    enddate?: string;
    jacket?: ImageField | string;
    credits?: EventCredit[];
    place?: string;
    space?: string;
    mapUrl?: string;
    notes?: string;
    lineup?: EventLineupItem[];
    project?: ProjectField | ProjectField[]; // 配列形式もサポート
};

// mock-data.local.ts はgitignore対象のローカルファイル。存在しない場合は空データにフォールバック。
// eslint-disable-next-line @typescript-eslint/no-require-imports
const LOCAL = (() => { try { return require('./mock-data.local'); } catch { return {}; } })();

const MOCK = {
    works: (LOCAL.MOCK_WORKS ?? []) as Work[],
    events: (LOCAL.MOCK_EVENTS ?? []) as Event[],
    links: (LOCAL.MOCK_LINKS ?? []) as { label: string; url: string }[]
};

function hasMicroCMSEnv() {
    if (process.env.MICROCMS_FORCE_MOCK === 'true') return false;
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

export async function getLatestWorkByProject(projectName: string): Promise<Work | undefined> {
    if (!hasMicroCMSEnv()) {
        return MOCK.works.find(w => {
            const project = Array.isArray(w.project) ? w.project[0] : w.project;
            return typeof project === 'string' ? project === projectName : project?.name === projectName;
        });
    }
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?filters=project[contains]${projectName}&limit=1&orders=-releaseDate`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents?.[0];
}

export async function listWorks(): Promise<Work[]> {
    if (!hasMicroCMSEnv()) return MOCK.works;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?limit=100&orders=-releaseDate`;
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
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/event?limit=100&orders=date`;
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

export type Notice = {
    title: string;
    slug: string;
    body?: string;
    category?: string;
    important?: boolean;
    date?: string;
};

const MOCK_NOTICES: Notice[] = LOCAL.MOCK_NOTICES ?? [];

export async function listNotices(): Promise<Notice[]> {
    if (!hasMicroCMSEnv()) return MOCK_NOTICES;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/notice?limit=100&orders=-date`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 60}
    });
    const json = await res.json();
    return json?.contents ?? [];
}

export async function getNotice(slug: string): Promise<Notice | undefined> {
    if (!hasMicroCMSEnv()) return MOCK_NOTICES.find(n => n.slug === slug);
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/notice?filters=slug[equals]${slug}&limit=1`;
    const res = await fetch(endpoint, {headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!}});
    if (!res.ok) return undefined;
    const json = await res.json();
    return json?.contents?.[0];
}

export async function listLinks(): Promise<{ label: string; url: string }[]> {
    if (!hasMicroCMSEnv()) return MOCK.links;
    const endpoint = `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/link?limit=100`;
    const res = await fetch(endpoint, {
        headers: {"X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!},
        next: {revalidate: 300}
    });
    const json = await res.json();
    return json?.contents ?? [];
}
