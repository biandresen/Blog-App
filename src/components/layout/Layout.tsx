import { FaGithub } from "react-icons/fa";

import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const footerText = "Birger Andresen";
  const footerLink = "https://github.com/biandresen/Blog-App";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <Header />
      <main className="flex-100 flex flex-col mx-auto">{children}</main>
      <footer className="theme-primary py-2.5 grid place-items-center">
        <div className="flex items-center gap-2">
          <a title="github link" target="_blank" rel="noopener noreferrer" href={footerLink}>
            <FaGithub to={footerLink} size={20} className="text-[var(--text2)] hover:animate-spin" />
          </a>
          <p className="text-center text-xs text-[var(--text2)] font-medium">{footerText}</p>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
