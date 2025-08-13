// Layout.tsx
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRightBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout = ({ setLeftBarIsOpen, setRightBarIsOpen, children }: LayoutProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Force both open
        setLeftBarIsOpen(true);
        // setRightBarIsOpen(true);
      } else {
        // Force both closed
        setLeftBarIsOpen(false);
        setRightBarIsOpen(false);
      }
    };

    // Run on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setLeftBarIsOpen, setRightBarIsOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header setLeftBarIsOpen={setLeftBarIsOpen} setRightBarIsOpen={setRightBarIsOpen} />
      <main className="flex flex-col mx-auto relative w-full flex-100">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
