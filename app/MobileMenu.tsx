"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "./BrandLogo";

type MobileMenuProps = {
  items: {
    label: string;
    href: string;
  }[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="mobile-menu-root">
      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="menu-label">Menu</span>
        <span className="menu-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {mounted
        ? createPortal(
            <div
              className={`mobile-menu-overlay${open ? " is-open" : ""}`}
              aria-hidden={!open}
            >
              <button
                className="mobile-menu-scrim"
                type="button"
                aria-label="Close menu"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              />

              <div
                className="mobile-menu-panel"
                id={menuId}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
              >
                <div className="mobile-menu-head">
                  <BrandLogo className="mobile-menu-logo" />
                  <button
                    ref={closeRef}
                    className="menu-close"
                    type="button"
                    aria-label="Close menu"
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                  >
                    <span />
                    <span />
                  </button>
                </div>

                <nav className="mobile-menu-links" aria-label="Site pages">
                  {items.map((item) => (
                    <a
                      href={item.href}
                      key={item.label}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
