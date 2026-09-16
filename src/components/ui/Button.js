import Link from "next/link";

const BASE_CLASS =
  "inline-flex items-center justify-center gap-1 rounded-full px-2 py-1 text-sm font-normal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none";

const VARIANT_CLASS = {
  solid: "bg-accent text-paper",
  outline: "border border-border text-ink hover:border-ink",
};

export default function Button({
  href,
  variant = "solid",
  className = "",
  children,
  ...props
}) {
  const classes =
    `${BASE_CLASS} ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.solid} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
