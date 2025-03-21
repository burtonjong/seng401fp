"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

interface HomeHeroProps {
  username: string;
}

export default function HomeHero({ username }: HomeHeroProps) {
  useEffect(() => {
    const textElements = document.querySelectorAll(".split-text");

    textElements.forEach((element) => {
      const text = element.textContent || "";

      element.innerHTML = text
        .split("")
        .map((char) => `<span class="char">${char}</span>`)
        .join("");

      const chars = element.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.05 }
      );
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center pb-20 overflow-auto text-wrap">
      <h1 className="text-xl md:text-4xl font-medium">
        <span className="split-text bg-gradient-to-r from-[var(--gradient-6)] to-[var(--gradient-7)] bg-clip-text text-transparent">
          {"Hello, "}
          {username}
        </span>
      </h1>
    </div>
  );
}
