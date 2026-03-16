import type { Metadata } from "next";
import "./globals.css";

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
    type: 'website',
    title: "Souken521 / System D.B.R.",
      description: "Souken521個人と主催サークルSystem D.B.R.のウェブサイト",
    locale: 'ja_JP',
    url: 'https://your-site.vercel.app/',
    siteName: "Souken521 / System D.B.R.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ja">
            <body className="min-h-screen flex flex-col">
                {children}
            </body>
        </html>
    );
}
