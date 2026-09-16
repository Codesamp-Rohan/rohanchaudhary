"use client";

import { useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#%&";

export default function ScrambleText({
  text,
  className,
  speed = 60,
  revealDelay = 2,
  trigger = "mount",
}) {
  const [display, setDisplay] = useState(text);
  const timeoutRef = useRef(null);

  function runScramble() {
    clearTimeout(timeoutRef.current);
    let iteration = 0;
    const totalFrames = text.length * revealDelay;

    function tick() {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / revealDelay) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < totalFrames) {
        iteration += 1;
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        setDisplay(text);
      }
    }

    tick();
  }

  useEffect(() => {
    if (trigger === "mount") {
      runScramble();
    }

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  const hoverProps =
    trigger === "hover" ? { onMouseEnter: runScramble } : {};

  return (
    <span className={className} aria-label={text} {...hoverProps}>
      {display}
    </span>
  );
}
