import type { Metadata } from "next";

const nameEn = process.env.NEXT_PUBLIC_PORTFOLIO_NAME_EN ?? "";

export const metadata: Metadata = {
    title: { absolute: `${nameEn} | Portfolio` },
    robots: {
        index: false,
        follow: false,
    },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {children}
        </div>
    );
}
