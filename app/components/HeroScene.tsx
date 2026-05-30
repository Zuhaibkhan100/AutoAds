"use client";

import { useEffect, useState } from "react";
import UnicornScene from "unicornstudio-react/next";

function bindMediaQuery(
  mediaQuery: MediaQueryList,
  listener: () => void
) {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }

  mediaQuery.addListener(listener);
  return () => mediaQuery.removeListener(listener);
}

export default function HeroScene() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSceneState = () => {
      if (reducedMotionQuery.matches) {
        document.documentElement.classList.add("prefers-reduced-motion");
      } else {
        document.documentElement.classList.remove("prefers-reduced-motion");
      }
    };

    updateSceneState();

    const removeMotionListener = bindMediaQuery(reducedMotionQuery, updateSceneState);

    return () => {
      removeMotionListener();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none translate-y-[4.5rem]">
      <UnicornScene
        projectId="nAnysHvG0RzF7fmX6f79"
        width="100%"
        height="100%"
        scale={1}
        dpi={2}
        fps={60}
        placeholderClassName="bg-[radial-gradient(circle_at_top,_rgba(255,214,10,0.18),_transparent_48%),radial-gradient(circle_at_right,_rgba(58,134,255,0.16),_transparent_42%)]"
      />
    </div>
  );
}
