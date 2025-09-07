"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    ezstandalone?: any;
  }
}

export default function EzoicAds({ slot }: { slot: number }) {
  useEffect(() => {
    if (window.ezstandalone?.cmd) {
      window.ezstandalone.cmd.push(() => {
        window.ezstandalone.showAds(slot);
      });
    }
  }, [slot]);

  return <div id={`ezoic-pub-ad-placeholder-${slot}`} />;
}
