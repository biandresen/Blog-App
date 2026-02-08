import { useEffect, useState } from "react";
import Header from "../../components/organisms/Header";
import { type LayoutProps } from "../../types/layout.types";
import Modal from "../../components/molecules/Modal";
import ContactTemplate from "../../components/organisms/ContactTemplate";

const Layout = ({ setSidebars, children }: LayoutProps) => {
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const isBigScreen = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSidebars(e.matches ? { left: true, right: true } : { left: false, right: false });
    };

    setSidebars(isBigScreen.matches ? { left: true, right: true } : { left: false, right: false });

    isBigScreen.addEventListener("change", handleChange);
    return () => isBigScreen.removeEventListener("change", handleChange);
  }, [setSidebars]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header setSidebars={setSidebars} />

      <main className="flex flex-col mx-auto relative w-full flex-100">{children}</main>

      {/* Sticky report button */}
      <button
        className="fixed bottom-7 left-7 z-[60] bg-[var(--button5)] text-[var(--text0)] font-bold text-sm rounded-full outline-3 outline-[var(--button3)] w-15 h-15 flex items-center justify-center shadow-lg hover:brightness-110"
        aria-label="Report an issue"
        type="button"
        onClick={() => setReportOpen(true)}
      >
        Report
      </button>

      <Modal
        isOpen={reportOpen}
        title="Report an issue"
        onClose={() => setReportOpen(false)}
        variant="custom"
      >
        <ContactTemplate />
      </Modal>

    </div>
  );
};

export default Layout;
