"use client";

import { usePathname } from "next/navigation";
import LocalClock from "@/components/ui/LocalClock";
import ScrambleText from "@/components/ui/ScrambleText";

export default function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-xl border-t border-x border-border bg-paper">
      <div className="flex flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {year} Rohan Chaudhary</span>
        <LocalClock />
        <a
          href="mailto:rohan.design@icloud.com"
          className="transition-colors hover:text-accent"
        >
          <ScrambleText
            text="rohan.design@icloud.com"
            trigger="hover"
            speed={100}
            revealDelay={0.3}
          />
        </a>
      </div>
    </footer>
  );
}
