import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {Analytics} from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: {
        template: "%s | Souken521 / System D.B.R.",
        default: "Souken521 / System D.B.R."
    },
    description: "Souken521個人と主催サークルSystem D.B.R.のウェブサイトです.",
    openGraph: {title: "Souken521 / System D.B.R.", description: "Music Circle — System D.B.R.", type: "website"}
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (<html lang="ja">
    <body className="min-h-screen flex flex-col"><Header/>
    <main className="flex-1">{children}</main>
    <Footer/><Analytics/></body>
    </html>)
}