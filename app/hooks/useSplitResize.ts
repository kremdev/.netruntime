// hooks/useSplitResize.ts

import { useState, useRef, MouseEvent } from "react";
import type { UseSplitResizeReturn } from "@/types/props";

export const useSplitResize = (): UseSplitResizeReturn => {
  const [splitPos, setSplitPos] = useState(60);
  const isDragging = useRef(false);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;

    const onMove = (ev: globalThis.MouseEvent) => {
      if (!isDragging.current) return;
      const pct = (ev.clientX / window.innerWidth) * 100;
      if (pct > 25 && pct < 80) setSplitPos(pct);
    };

    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return { splitPos, onMouseDown };
};
