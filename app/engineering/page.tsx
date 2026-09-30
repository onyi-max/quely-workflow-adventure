import type { Metadata } from "next";
import { meta } from "@/content/map";
import { EngineeringPath } from "@/scenes/engineering";

export const metadata: Metadata = {
  title: meta.engineering.title,
  description: meta.engineering.description,
  openGraph: { title: meta.engineering.title, description: meta.engineering.description },
};

export default function Page() {
  return <EngineeringPath />;
}
