"use client";

import dynamic from "next/dynamic";

const UnicornScene = dynamic(
  () => import("unicornstudio-react/next").then((m) => m.default),
  { ssr: false }
);

export default function UnicornHeroTree() {
  return (
    <UnicornScene
      projectId="oUvrbe0q0WuFIIWyfR7ZD?update=0.7939987615311904"
      sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js"
      width="100%"
      height="100%"
      scale={1}
      dpi={1.5}
      fps={60}
      ariaLabel="Unicorn Studio Scene"
      className="unicorn-tree"
      lazyLoad={true}
      production={true}
      altText="Animated pixel tree"
    />
  );
}
