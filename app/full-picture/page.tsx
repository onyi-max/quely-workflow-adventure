import type { Metadata } from "next";
import { meta } from "@/content/map";
import { Finale } from "@/components/results/Finale";

export const metadata: Metadata = {
  title: meta.fullPicture.title,
  description: meta.fullPicture.description,
  openGraph: { title: meta.fullPicture.title, description: meta.fullPicture.description },
};

export default function Page() {
  return <Finale />;
}
