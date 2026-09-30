import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Button({ href, variant = "gold", icon = true, children, className = "", ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const content = <><span>{children}</span>{icon && <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />}</>;
  return href ? <Link className={cls} href={href} {...rest}>{content}</Link> : <button className={cls} {...rest}>{content}</button>;
}
