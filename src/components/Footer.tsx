import Link from "next/link";

export function Footer() {
    return (<footer className="border-t border-white/10 py-10 mt-16">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4"><p
            className="text-sm">© {new Date().getFullYear()} System D.B.R.</p>
            <div className="flex gap-4 text-sm"><Link href="/privacy">プライバシー</Link><a href="https://x.com"
                                                                                            target="_blank"
                                                                                            rel="noreferrer">X</a><a
                href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a><a href="https://booth.pm"
                                                                                              target="_blank"
                                                                                              rel="noreferrer">BOOTH</a>
            </div>
        </div>
    </footer>)
}