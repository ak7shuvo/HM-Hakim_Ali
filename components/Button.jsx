"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  href,
  variant = "gold",
  icon = true,
  loading = false,
  disabled = false,
  children,
  className = "",
  onClick,
  ...rest
}) {
  const blocked = Boolean(disabled || loading);

  const cls = [
    "btn",
    `btn-${variant}`,
    loading && "is-loading",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="btn-icon"
          size={15}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  );

  const guard = (event) => {
    if (blocked) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  if (href) {
    return (
      <Link
        className={cls}
        href={href}
        data-variant={variant}
        aria-busy={loading || undefined}
        aria-disabled={blocked || undefined}
        tabIndex={blocked ? -1 : undefined}
        {...rest}
        onClick={guard}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      data-variant={variant}
      aria-busy={loading || undefined}
      disabled={blocked}
      {...rest}
      onClick={guard}
    >
      {content}
    </button>
  );
}
