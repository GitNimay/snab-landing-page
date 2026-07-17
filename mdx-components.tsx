import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/Callout";
import { FaqList } from "@/components/mdx/FaqList";
import { LinkPreview } from "@/components/mdx/LinkPreview";

function headingId(children: ReactNode) {
  if (typeof children !== "string") return undefined;
  return children
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function MdxLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  wrapper: ({ children }) => <article className="mdx-article">{children}</article>,
  h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  h2: ({ children, id, ...props }) => (
    <h2 id={id || headingId(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id || headingId(children)} {...props}>
      {children}
    </h3>
  ),
  a: MdxLink,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async" {...props} />
  ),
  Callout,
  FaqList,
  LinkPreview,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

