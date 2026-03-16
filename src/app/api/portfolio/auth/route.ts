import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { password } = await request.json() as { password?: string };

    const correctPassword = process.env.PORTFOLIO_PASSWORD;
    const sessionSecret = process.env.PORTFOLIO_SESSION_SECRET;

    if (!correctPassword || !sessionSecret) {
        return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 });
    }

    if (password !== correctPassword) {
        return NextResponse.json({ error: "パスワードが違います" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("portfolio_auth", sessionSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7日間
        path: "/",
    });
    return response;
}
