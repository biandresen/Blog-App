import { useEffect } from "react";

import Header from "../../components/organisms/Header";
import { type LayoutProps } from "../../types/layout.types";

const Layout = ({ setSidebars, children }: LayoutProps) => {
  useEffect(() => {
    const isBigScreen = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSidebars(e.matches ? { left: true, right: true } : { left: false, right: false });
    };

    // Run once
    setSidebars(isBigScreen.matches ? { left: true, right: true } : { left: false, right: false });

    isBigScreen.addEventListener("change", handleChange);
    return () => isBigScreen.removeEventListener("change", handleChange);
  }, [setSidebars]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header setSidebars={setSidebars} />
      <main className="flex flex-col mx-auto relative w-full flex-100">{children}</main>
    </div>
  );
};
export default Layout;

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth >= 768) {
//       setSidebars({ left: true, right: true });
//     } else {
//       setSidebars({ left: false, right: false });
//     }
//   };

//   handleResize(); // run once
//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, [setSidebars]);
