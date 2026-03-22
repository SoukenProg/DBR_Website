import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
    title: {
        template: "%s | Souken521 / System D.B.R.",
        default: "Souken521 / System D.B.R."
    },
    description: "Souken521個人と主催サークルSystem D.B.R.のウェブサイトです.",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        }
    },
    openGraph: {
        type: "website",
        title: "Souken521 / System D.B.R.",
        description: "Souken521個人と主催サークルSystem D.B.R.のウェブサイト",
        locale: "ja_JP",
        url: "https://souken521.com",
        siteName: "Souken521 / System D.B.R.",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
                )}
            </body>
        </html>
    );
}
