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
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSceneState = () => {
      setCanRender(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    updateSceneState();

    const removeDesktopListener = bindMediaQuery(desktopQuery, updateSceneState);
    const removeMotionListener = bindMediaQuery(reducedMotionQuery, updateSceneState);

    return () => {
      removeDesktopListener();
      removeMotionListener();
    };
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 hidden h-full w-full overflow-hidden opacity-70 pointer-events-none lg:block">
      <UnicornScene
        projectId="nAnysHvG0RzF7fmX6f79"
        width="100%"
        height="100%"
        scale={0.85}
        dpi={1}
        fps={60}
        placeholderClassName="bg-[radial-gradient(circle_at_top,_rgba(255,214,10,0.18),_transparent_48%),radial-gradient(circle_at_right,_rgba(58,134,255,0.16),_transparent_42%)]"
      />
    </div>
  );
}
