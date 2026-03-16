import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /portfolio/login は認証不要
    if (pathname === "/portfolio/login") {
        return NextResponse.next();
    }

    // /portfolio 以下は認証が必要
    if (pathname.startsWith("/portfolio")) {
        const token = request.cookies.get("portfolio_auth");
        const sessionSecret = process.env.PORTFOLIO_SESSION_SECRET;

        if (!sessionSecret || !token || token.value !== sessionSecret) {
            return NextResponse.redirect(new URL("/portfolio/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/portfolio/:path*"],
};