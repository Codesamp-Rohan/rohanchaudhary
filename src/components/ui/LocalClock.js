"use client";

import { useEffect, useState } from "react";

export default function LocalClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted lg:fixed lg:left-4 lg:top-4">
      <span
        className="h-1.5 w-1.5 rounded-full bg-accent"
        aria-hidden="true"
      />
      {time ?? "--:--"} · Open to freelance work
    </span>
  );
}
