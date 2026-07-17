import type { Metadata } from "next";

export const siteConfig = {
  name: "SNAB Innovations",
  shortName: "SNAB",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://snab.ai",
  description:
    "SNAB Innovations designs and engineers AI products, workflow automation, web platforms, apps, and custom software from Nashik, India.",
  location: {
    locality: "Nashik",
    region: "Maharashtra",
    postalCode: "422005",
    country: "IN",
  },
  email: "info.snabinnovations@gmail.com",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
