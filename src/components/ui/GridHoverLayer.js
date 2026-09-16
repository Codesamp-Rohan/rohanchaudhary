"use client";

import { useEffect, useRef, useState } from "react";

const CELL_SIZE = 24;
const RESIZE_DEBOUNCE = 150;
const REVERT_DELAY = 500;

function computeDims() {
  if (typeof window === "undefined") return { cols: 0, rows: 0 };
  return {
    cols: Math.ceil(window.innerWidth / CELL_SIZE) + 1,
    rows: Math.ceil(window.innerHeight / CELL_SIZE) + 1,
  };
}

export default function GridHoverLayer() {
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const cellRefs = useRef(new Map());
  const revertTimeouts = useRef(new Map());
  const lastIndexRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    function applyDims() {
      setDims(computeDims());
    }

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(applyDims, RESIZE_DEBOUNCE);
    }

    applyDims();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    function activate(index) {
      clearTimeout(revertTimeouts.current.get(index));
      revertTimeouts.current.delete(index);
      cellRefs.current.get(index)?.classList.add("grid-cell--active");
    }

    function scheduleRevert(index) {
      const timeoutId = setTimeout(() => {
        cellRefs.current.get(index)?.classList.remove("grid-cell--active");
        revertTimeouts.current.delete(index);
      }, REVERT_DELAY);
      revertTimeouts.current.set(index, timeoutId);
    }

    function handleMove(event) {
      const col = Math.floor(event.clientX / CELL_SIZE);
      const row = Math.floor(event.clientY / CELL_SIZE);
      const index = row * dims.cols + col;

      if (index === lastIndexRef.current) return;

      if (lastIndexRef.current !== null) {
        scheduleRevert(lastIndexRef.current);
      }

      activate(index);
      lastIndexRef.current = index;
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [dims.cols]);

  const totalCells = dims.cols * dims.rows;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 grid"
      style={{
        gridTemplateColumns: `repeat(${dims.cols}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${dims.rows}, ${CELL_SIZE}px)`,
      }}
    >
      {Array.from({ length: totalCells }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cellRefs.current.set(index, el);
            else cellRefs.current.delete(index);
          }}
          className="grid-cell"
        />
      ))}
    </div>
  );
}
