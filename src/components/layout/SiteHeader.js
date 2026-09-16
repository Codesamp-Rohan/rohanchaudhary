import Link from "next/link";
import ScrambleText from "@/components/ui/ScrambleText";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-paper">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-ink transition-transform duration-200 hover:scale-105 hover:text-accent"
        >
          rohanchaudhary
        </Link>
        <nav className="flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted transition-colors hover:text-accent"
            >
              <ScrambleText text={link.label} trigger="hover" speed={100} revealDelay={1} className="text-xs" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
