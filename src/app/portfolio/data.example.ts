// ============================================================
// ポートフォリオ プライベートデータ — サンプル
// このファイルをコピーして data.private.ts を作成し、実際の内容を記入してください。
//   cp src/app/portfolio/data.example.ts src/app/portfolio/data.private.ts
// ============================================================

export const PROFILE_EXTRA = {
    title: "TODO: 志望職種",
    github: "https://github.com/your-handle",
    portfolio: "https://your-portfolio-url.com",
    summary: `TODO: 自己PRを記入してください。`,
};

export const SKILLS: { category: string; items: string[] }[] = [
    {
        category: "フロントエンド",
        items: ["TODO"],
    },
    {
        category: "バックエンド / インフラ",
        items: ["TODO"],
    },
];

export const WORKS: {
    title: string;
    description: string;
    tags: string[];
    links?: { label: string; url: string }[];  // 例: [{ label: "GitHub", url: "..." }, { label: "デモ", url: "..." }]
    period: string;
}[] = [
    {
        title: "TODO: 作品・プロジェクト名",
        description: "TODO: プロジェクトの概要",
        tags: ["TODO"],
        links: [
            { label: "GitHub", url: "https://github.com/TODO" },
            // { label: "デモ", url: "https://TODO" },
        ],
        period: "TODO",
    },
];

export const EXPERIENCE: {
    role: string;
    org: string;
    period: string;
    description: string;
}[] = [
    {
        role: "TODO: 役職・職種",
        org: "TODO: 組織名",
        period: "TODO: 期間",
        description: "TODO: 担当業務・実績",
    },
];

export const EDUCATION: {
    school: string;
    degree: string;
    from: string;  // 入学年月（例: "2020年4月"）
    to: string;    // 卒業・修了年月（例: "2024年3月" / "2026年3月 予定"）
    note?: string; // 任意の補足
}[] = [
    // 入学年が古い順（上が古い）で記載すること
    {
        school: "TODO: 学校名",
        degree: "TODO: 学部・専攻 / 卒業",
        from: "TODO: 年月",
        to: "TODO: 年月",
    },
];

// AtCoderのレーティング色（公式の色定義に準拠）
export const RATING_COLOR: Record<string, string> = {
    gray:   "#808080",
    brown:  "#804000",
    green:  "#008000",
    cyan:   "#00C0C0",
    blue:   "#0000FF",
    yellow: "#C0C000",
    orange: "#FF8000",
    red:    "#FF0000",
};

export const COMPETITIVE_PROGRAMMING: {
    platform: string;
    handle: string;
    url: string;
    rating: number;
    ratingColor: keyof typeof RATING_COLOR;
    highestRating: number;
    contestCount: number;
    note?: string;
}[] = [
    // 記載がなければ空配列にしてください: []
    {
        platform: "TODO:プラットフォーム例",
        handle: "TODO: ユーザー名",
        url: "https://atcoder.jp/users/TODO",
        rating: 0,
        ratingColor: "gray",
        highestRating: 0,
        contestCount: 0,
        note: "TODO: コメント",
    },
];
