type LinkPreviewProps = {
  href: string;
  title: string;
  description: string;
  image?: string;
  label?: string;
};

export function LinkPreview({
  href,
  title,
  description,
  image,
  label = "Explore",
}: LinkPreviewProps) {
  const external = href.startsWith("http");

  return (
    <a
      className="mdx-link-preview"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" loading="lazy" decoding="async" />
      ) : null}
      <span className="mdx-link-preview-copy">
        <span className="mdx-link-preview-label">{label}</span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="mdx-link-preview-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

