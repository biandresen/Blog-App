import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

import LeftSidebar2 from "../../components/molecules/LeftSidebar2";
import RightSidebar from "../../components/molecules/RightSidebar";
import { type PostsLayoutProps } from "../../types/layout.types";

const SCROLL_THRESHOLD = 150;

const JokesLayout = ({ setSidebars, sidebars }: PostsLayoutProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const shouldShow = container.scrollTop > SCROLL_THRESHOLD;

      // Only update state if value actually changes
      setShowScrollTop(prev => (prev !== shouldShow ? shouldShow : prev));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="layout-container">
      {sidebars.left && <LeftSidebar2 setSidebars={setSidebars} />}

      <div ref={scrollRef} className="outlet-container relative">
        <div className="min-h-full pb-20">
          <Outlet />
        </div>


          <button
            type="button"
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className={`fixed bottom-2 right-6 z-[60]
                       w-8 h-8 text-xl md:sticky md:ml-[-20px] xl:ml-0
                       xl:w-12 xl:h-12 xl:text-4xl rounded-full
                       bg-[var(--button3)] text-[var(--text0)] font-bold
                       flex items-center justify-center
                       hover:brightness-110 ${showScrollTop ? "opacity-100" : "opacity-0"}
                       transition-opacity duration-200`}
          >
            ↑
          </button>
      </div>

      {sidebars.right && <RightSidebar />}
    </div>
  );
};

export default JokesLayout;
