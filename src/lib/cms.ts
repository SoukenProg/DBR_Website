type Platform = { label: string; url: string; iconKey?: string };
export type Work = {
  title: string;
  slug: string;
  jacket?: string;
  releaseDate?: string;
  description?: string;
  tags?: string[];
  platforms?: Platform[];
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
};

const MOCK = {
  works: [
    {
      title: "Rival Sabers - Prototype",
      slug: "rival-sabers-prototype",
      releaseDate: "2025-08-15",
      tags: ["future-bass", "game-ready"],
      platforms: [
        { label: "YouTube", url: "https://youtu.be/xxxxxxxx", iconKey: "youtube" },
        { label: "BOOTH", url: "https://booth.pm/ja/items/xxxxxxxx", iconKey: "booth" }
      ]
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
          work: { title: "Rival Sabers - Prototype", slug: "rival-sabers-prototype" },
          price: 1500,
          isNew: true,
          boothUrl: "https://booth.pm/ja/items/xxxxxxxx",
          order: 1
        }
      ]
    }
  ] as Event[],
  links: [
    { label: "X", url: "https://x.com" },
    { label: "YouTube", url: "https://youtube.com" },
    { label: "BOOTH", url: "https://booth.pm" }
  ]
};

function hasMicroCMSEnv(){return !!process.env.MICROCMS_SERVICE_DOMAIN && !!process.env.MICROCMS_API_KEY;}

export async function getLatestWork(): Promise<Work|undefined>{
  if(!hasMicroCMSEnv()) return MOCK.works[0];
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?limit=1&orders=-releaseDate`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!},next:{revalidate:300}});
  const json=await res.json();return json?.contents?.[0];
}
export async function listWorks(): Promise<Work[]>{
  if(!hasMicroCMSEnv()) return MOCK.works;
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work?orders=-releaseDate`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!},next:{revalidate:300}});
  const json=await res.json();return json?.contents??[];
}
export async function getWork(slug:string): Promise<Work|undefined>{
  if(!hasMicroCMSEnv()) return MOCK.works.find(w=>w.slug===slug);
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/work/${slug}`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!}});
  if(!res.ok) return undefined; return await res.json();
}
export async function listEvents(): Promise<Event[]>{
  if(!hasMicroCMSEnv()) return MOCK.events;
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/event?orders=date`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!},next:{revalidate:300}});
  const json=await res.json();return json?.contents??[];
}
export async function getEvent(slug:string): Promise<Event|undefined>{
  if(!hasMicroCMSEnv()) return MOCK.events.find(e=>e.slug===slug);
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/event/${slug}?depth=2`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!}});
  if(!res.ok) return undefined; return await res.json();
}
export async function listLinks(): Promise<{label:string;url:string}[]>{
  if(!hasMicroCMSEnv()) return MOCK.links;
  const endpoint=`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/link`;
  const res=await fetch(endpoint,{headers:{"X-MICROCMS-API-KEY":process.env.MICROCMS_API_KEY!},next:{revalidate:300}});
  const json=await res.json();return json?.contents??[];
}
