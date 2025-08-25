// Layout.tsx
import Header from "../../components/organisms/Header";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  setSidebars: React.Dispatch<
    React.SetStateAction<{
      left: boolean;
      right: boolean;
    }>
  >;
}

const Layout = ({ setSidebars, children }: LayoutProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Force both open
        setSidebars({ left: true, right: true });
      } else {
        // Force both closed
        setSidebars({ left: true, right: true });
      }
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebars]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header setSidebars={setSidebars} />
      <main className="flex flex-col mx-auto relative w-full flex-100">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
