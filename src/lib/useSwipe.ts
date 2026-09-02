"use client";

import { useRef } from "react";
import type { TouchEvent } from "react";

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 40) {
  const startX = useRef(0);
  const startY = useRef(0);
  const swiped = useRef(false);

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    swiped.current = false;
  };

  const onTouchMove = (e: TouchEvent) => {
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      swiped.current = true;
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!swiped.current) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx < -threshold) onSwipeLeft();
    else if (dx > threshold) onSwipeRight();
    e.preventDefault();
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
