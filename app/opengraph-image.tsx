import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SocialPreview } from "@/components/seo/SocialPreview";

export const alt =
  "SNAB Innovations — AI products, workflow automation, and custom software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const background = await readFile(
    join(process.cwd(), "public/seo/pixel-tree-social-bg.png"),
    "base64",
  );

  return new ImageResponse(
    <SocialPreview backgroundSrc={`data:image/png;base64,${background}`} />,
    size,
  );
}

