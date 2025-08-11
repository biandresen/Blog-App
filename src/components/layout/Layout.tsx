import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="flex flex-col mx-auto relative w-[100%] flex-100">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
