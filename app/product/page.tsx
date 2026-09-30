import type { Metadata } from "next";
import { meta } from "@/content/map";
import { ComingSoon } from "@/components/path/ComingSoon";

export const metadata: Metadata = {
  title: meta.product.title,
  description: meta.product.description,
  openGraph: { title: meta.product.title, description: meta.product.description },
};

export default function Page() {
  return <ComingSoon id="product" />;
}
