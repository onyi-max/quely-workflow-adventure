import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontFamilyVars, fontVariables } from "./fonts";
import { meta } from "@/content/map";
import { QuestionsProvider } from "@/components/QuestionsModal";
import { TopBar } from "@/components/TopBar";
import "@/styles/1-base.css";
import "@/styles/2-map.css";
import "@/styles/3-path.css";
import "@/styles/4-quely-ui.css";
import "@/styles/5-scenes.css";
import "@/styles/6-additions.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.home.title,
  description: meta.home.description,
  openGraph: {
    type: "website",
    siteName: meta.siteName,
    title: meta.home.title,
    description: meta.home.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} style={fontFamilyVars}>
      <body>
        <QuestionsProvider>
          <div className="wrap">
            <TopBar />
            {children}
          </div>
        </QuestionsProvider>
      </body>
    </html>
  );
}
