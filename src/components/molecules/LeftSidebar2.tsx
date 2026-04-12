import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes, CgProfile } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { IoDice } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { GiPodium, GiCrown, GiTrophyCup } from "react-icons/gi";
import { MdRocketLaunch } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";

const baseLink = "flex gap-2 items-center py-1 px-4 rounded-full -ml-4 transition-colors";
const activeLink = `${baseLink} bg-[var(--primary)] mr-1.5`;
const inactiveLink = `${baseLink} bg-transparent`;

const groupHeader = "w-full px-4 py-2 -ml-4 text-sm uppercase font-semibold tracking-wider opacity-75";

interface SidebarItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

function SidebarLink({ item, onNavigate }: { item: SidebarItem; onNavigate: () => void }) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
    >
      {item.icon}
      <span className="text-lg font-medium">{item.label}</span>
    </NavLink>
  );
}

export default function LeftSidebar2({ setSidebars }: any) {
  const { user } = useUser();
  const { t } = useLanguage();

  const handleNavigate = () => {
    if (window.innerWidth < 768) {
      setSidebars({ left: false, right: false });
    }
  };

  const exploreItems: SidebarItem[] = useMemo(
    () => [
      {
        label: t("sidebar.jokes.items.allJokes"),
        to: "/jokes/all-jokes",
        icon: <CgNotes size={20} />,
      },
      {
        label: t("sidebar.jokes.items.popular"),
        to: "/jokes/popular",
        icon: <TbChartBarPopular size={20} />,
      },
      {
        label: t("sidebar.jokes.items.random"),
        to: "/jokes/random-joke",
        icon: <IoDice size={20} />,
      },
    ],
    [t],
  );

  const rankingItems: SidebarItem[] = useMemo(
    () => [
      {
        label: t("sidebar.jokes.items.leaderboard"),
        to: "/jokes/leaderboard",
        icon: <GiPodium size={20} />,
      },
      {
        label: t("sidebar.jokes.items.dailyJoke"),
        to: "/jokes/daily-joke",
        icon: <GiCrown size={20} />,
      },
      {
        label: t("sidebar.jokes.items.topCreator"),
        to: "/jokes/top-creator-month",
        icon: <GiTrophyCup size={20} />,
      },
      {
        label: t("sidebar.jokes.items.trending"),
        to: "/jokes/trending-week",
        icon: <BsFillLightningChargeFill size={20} />,
      },
      {
        label: t("sidebar.jokes.items.mostCommented"),
        to: "/jokes/most-commented-week",
        icon: <FaComments size={20} />,
      },
      {
        label: t("sidebar.jokes.items.fastestGrowing"),
        to: "/jokes/fastest-growing",
        icon: <MdRocketLaunch size={20} />,
      },
    ],
    [t],
  );

  return (
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-64 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16 flex flex-col gap-3 w-54">
        <NavLink
          to="/jokes/search"
          onClick={handleNavigate}
          className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
        >
          <ImSearch size={20} />
          <span className="text-lg font-medium">{t("sidebar.jokes.search")}</span>
        </NavLink>

        {user && (
          <SidebarLink
            item={{
              label: t("sidebar.jokes.myJokes"),
              to: "/jokes/my-jokes",
              icon: <CgProfile size={20} />,
            }}
            onNavigate={handleNavigate}
          />
        )}

        <div>
          <div className={groupHeader}>
            <span className="text-lg">{t("sidebar.jokes.groups.explore")}</span>
          </div>

          <div className="flex flex-col gap-2 mt-0">
            {exploreItems.map((item) => (
              <SidebarLink key={item.to} item={item} onNavigate={handleNavigate} />
            ))}
          </div>
        </div>

        <div>
          <div className={groupHeader}>
            <span className="text-lg">{t("sidebar.jokes.groups.rankings")}</span>
          </div>

          <div className="flex flex-col gap-2 mt-0">
            {rankingItems.map((item) => (
              <SidebarLink key={item.to} item={item} onNavigate={handleNavigate} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
