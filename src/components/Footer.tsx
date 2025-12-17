import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 py-10 mt-16">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm">
                    © {new Date().getFullYear()} System D.B.R.
                </p>
                <div className="flex gap-4 text-sm">
                    <Link href="/privacy" className="hover:text-accentBlue transition-colors">プライバシー</Link>
                    <a href="https://x.com/souken521" target="_blank" rel="noreferrer" className="hover:text-accentBlue transition-colors">X</a>
                    <Link href="https://www.youtube.com/@souken_DBR" target="_blank" rel="noreferrer" className="hover:text-accentRed transition-colors">YouTube</Link>
                    <Link href="https://systemdbr.booth.pm" target="_blank" rel="noreferrer" className="hover:text-accentGreen transition-colors">BOOTH</Link>
                </div>
            </div>
        </footer>
    );
}