import type { Metadata } from "next";
import { meta } from "@/content/map";
import { ProductPath } from "@/scenes/product";

export const metadata: Metadata = {
  title: meta.product.title,
  description: meta.product.description,
  openGraph: { title: meta.product.title, description: meta.product.description },
};

export default function Page() {
  return <ProductPath />;
}
