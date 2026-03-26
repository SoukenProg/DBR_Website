"use client";
import Link from "next/link";
import type { Route } from "next";
import {useState} from "react";

export function Header() {
    const [open, setOpen] = useState(false);
    const nav = [
        { href: "/notices", label: "News" },
        { href: "/about", label: "About" },
        { href: "/works", label: "Works" },
        { href: "/events", label: "Events" },
        { href: "/links", label: "Links" },
        { href: "/discord", label: "Discord" },

    ] as const satisfies ReadonlyArray<{ href: Route; label: string }>;
    return (<header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-black/60 border-b border-gray-200 dark:border-white/10">
        <div className="container h-14 flex items-center justify-between">
            <Link href="/" className="font-bold tracking-wider text-gray-900 dark:text-white">
                System <span className="text-accentGreen">D.</span><span className="text-accentBlue">B.</span><span className="text-accentRed">R.</span> / Souken521
            </Link>
            <nav className="hidden md:flex gap-6">{nav.map(n => (
                <Link key={n.href} href={n.href} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white/80">{n.label}</Link>))}</nav>
            <button className="md:hidden text-gray-900 dark:text-white" onClick={() => setOpen(!open)} aria-label="menu">☰</button>
        </div>
        {open && (<div className="md:hidden border-t border-gray-200 dark:border-white/10">
            <div className="container py-2 flex flex-col gap-2">{nav.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300">{n.label}</Link>))}</div>
        </div>)}</header>)
}
