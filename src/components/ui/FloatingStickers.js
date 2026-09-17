"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import sticker1 from "@/assets/Img1.png";
import sticker2 from "@/assets/Img2.png";
import sticker3 from "@/assets/Img3.png";
import sticker4 from "@/assets/Img4.png";
import sticker5 from "@/assets/Img5.png";
import sticker6 from "@/assets/Img6.png";
import sticker7 from "@/assets/Img7.png";

const STICKERS = [
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
];

const TOP_RANGE_MIN = 8;
const TOP_RANGE_MAX = 88;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function splitBalanced(items) {
  const left = [];
  const right = [];

  for (const item of items) {
    const target =
      left.length === right.length
        ? Math.random() < 0.5
          ? left
          : right
        : left.length < right.length
          ? left
          : right;
    target.push(item);
  }

  return { left, right };
}

function distributeSide(images, side) {
  const span = TOP_RANGE_MAX - TOP_RANGE_MIN;
  const slot = span / images.length;

  return images.map((image, index) => ({
    image,
    side,
    top: TOP_RANGE_MIN + slot * index + randomBetween(slot * 0.1, slot * 0.7),
    delay: randomBetween(0, 3),
  }));
}

export default function FloatingStickers() {
  const [placements, setPlacements] = useState(null);

  useEffect(() => {
    function applyPlacements() {
      const shuffled = shuffle(STICKERS);
      const { left, right } = splitBalanced(shuffled);

      setPlacements([
        ...distributeSide(left, "left"),
        ...distributeSide(right, "right"),
      ]);
    }

    applyPlacements();
  }, []);

  if (!placements) return null;

  return (
    <>
      {placements.map((sticker, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={`floating-sticker pointer-events-none fixed z-10 hidden w-20 lg:block ${
            sticker.side === "left" ? "left-6" : "right-6"
          }`}
          style={{
            top: `${sticker.top}%`,
            animationDelay: `${sticker.delay}s`,
          }}
        >
          <div
            className="floating-sticker-inner"
            style={{ animationDelay: `${sticker.delay}s` }}
          >
            <Image src={sticker.image} alt="" className="h-auto w-full" />
          </div>
        </div>
      ))}
    </>
  );
}
