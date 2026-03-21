import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const host = request.headers.get("host") ?? "";
    const { pathname } = request.nextUrl;

    // portfolio.souken521.com へのリクエストを /portfolio にリライト
    // 認証は Cloudflare Access がサブドメイン全体を保護する（アプリ側での認証不要）
    if (host === "portfolio.souken521.com") {
        if (pathname === "/" || pathname === "") {
            return NextResponse.rewrite(new URL("/portfolio", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
