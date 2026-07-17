import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      className={`brand-logo${className ? ` ${className}` : ""}`}
      src="/logo.png"
      alt=""
      aria-hidden="true"
      width={612}
      height={612}
      sizes="64px"
      priority={priority}
    />
  );
}
