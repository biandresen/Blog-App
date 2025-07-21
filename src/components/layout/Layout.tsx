import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="theme-bg theme-text1 flex-100">{children}</main>
      <footer className="theme-primary theme-text1 py-5">© 2025 BlogApp</footer>
    </div>
  );
};
export default Layout;
