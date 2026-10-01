import type { Metadata } from "next";
import { meta } from "@/content/map";
import { DesignPath } from "@/scenes/design";

export const metadata: Metadata = {
  title: meta.design.title,
  description: meta.design.description,
  openGraph: { title: meta.design.title, description: meta.design.description },
};

export default function Page() {
  return <DesignPath />;
}
