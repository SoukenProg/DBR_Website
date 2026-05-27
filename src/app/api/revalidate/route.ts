import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({revalidated: false, message: "Invalid token"}, {status: 401});
    }

    revalidatePath("/");
    revalidatePath("/notices");
    revalidatePath("/works");
    revalidatePath("/works/[slug]", "page");
    revalidatePath("/events");
    revalidatePath("/events/[slug]", "page");

    return NextResponse.json({revalidated: true, now: Date.now()});
}