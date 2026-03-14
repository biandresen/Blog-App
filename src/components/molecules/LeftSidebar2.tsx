import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { CgNotes, CgProfile } from "react-icons/cg";
import { TbChartBarPopular } from "react-icons/tb";
import { IoDice } from "react-icons/io5";
import { FaComments } from "react-icons/fa";
import { GiBattleGear, GiPodium, GiCrown, GiTrophyCup } from "react-icons/gi";
import { MdExpandMore, MdExpandLess, MdRocketLaunch } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

import { useUser } from "../../contexts/UserContext";
import { useLanguage } from "../../contexts/LanguageContext";

type GroupKey = "explore" | "games" | "rankings" | null;

const baseLink =
  "flex gap-2 items-center py-1 px-4 rounded-full -ml-4 transition-colors";
const activeLink = `${baseLink} bg-[var(--primary)] mr-1.5`;
const inactiveLink = `${baseLink} bg-transparent`;

const groupHeader =
  "flex items-center justify-between w-full px-4 py-2 -ml-4 text-sm uppercase font-semibold tracking-wider opacity-75 hover:opacity-100 transition-opacity";

interface SidebarItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

function SidebarLink({
  item,
  onNavigate,
}: {
  item: SidebarItem;
  onNavigate: () => void;
}) {
  if (item.disabled) {
    return (
      <div className={`${inactiveLink} opacity-50 cursor-not-allowed`}>
        {item.icon}
        <span className="text-lg font-medium">{item.label}</span>
      </div>
    );
  }

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
  const location = useLocation();

  const handleNavigate = () => {
    if (window.innerWidth < 768) {
      setSidebars({ left: false, right: false });
    }
  };

  const exploreItems: SidebarItem[] = [
    {
      label: t("sidebar.jokes.items.allJokes"),
      to: "/jokes/all-jokes",
      icon: <CgNotes size={26} />,
    },
    {
      label: t("sidebar.jokes.items.popular"),
      to: "/jokes/popular",
      icon: <TbChartBarPopular size={26} />,
    },
    {
      label: t("sidebar.jokes.items.dailyJoke"),
      to: "/jokes/daily-joke",
      icon: <GiCrown size={26} />,
    },
  ];

  const gameItems: SidebarItem[] = [
    {
      label: t("sidebar.jokes.items.random"),
      to: "/jokes/random-joke",
      icon: <IoDice size={26} />,
    },
    {
      label: t("sidebar.jokes.items.jokeVsJoke"),
      to: "",
      icon: <GiBattleGear size={26} />,
      disabled: true,
    },
  ];

  const rankingItems: SidebarItem[] = [
    {
      label: t("sidebar.jokes.items.hallOfFame"),
      to: "/jokes/hall-of-fame",
      icon: <GiPodium size={26} />,
    },
    {
      label: t("sidebar.jokes.items.topCreator"),
      to: "/jokes/top-creator-month",
      icon: <GiTrophyCup size={26} />,
    },
    {
      label: t("sidebar.jokes.items.trending"),
      to: "/jokes/trending-week",
      icon: <BsFillLightningChargeFill size={26} />,
    },
    {
      label: t("sidebar.jokes.items.mostCommented"),
      to: "/jokes/most-commented-week",
      icon: <FaComments size={24} />,
    },
    {
      label: t("sidebar.jokes.items.fastestGrowing"),
      to: "/jokes/fastest-growing",
      icon: <MdRocketLaunch size={24} />,
    },
  ];

  const routeGroup = useMemo((): GroupKey => {
    const path = location.pathname;

    if (exploreItems.some((item) => path.startsWith(item.to))) return "explore";
    if (gameItems.some((item) => item.to && path.startsWith(item.to))) return "games";
    if (rankingItems.some((item) => path.startsWith(item.to))) return "rankings";

    return null;
  }, [location.pathname, exploreItems, gameItems, rankingItems]);

  const [openGroup, setOpenGroup] = useState<GroupKey>("explore");

  useEffect(() => {
    if (routeGroup) setOpenGroup(routeGroup);
  }, [routeGroup]);

  const toggleGroup = (key: Exclude<GroupKey, null>) => {
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  return (
    <aside className="bg-[var(--primary-shade)] absolute left-0 w-full h-[calc(100vh-3.8rem)] md:max-w-64 md:static z-40">
      <div className="ml-8 mt-5 md:mt-16 flex flex-col gap-3 w-54">
        <NavLink
          to="/jokes/search"
          onClick={handleNavigate}
          className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
        >
          <ImSearch size={26} />
          <span className="text-lg font-medium">{t("sidebar.jokes.search")}</span>
        </NavLink>

        {user && (
          <SidebarLink
            item={{
              label: t("sidebar.jokes.myJokes"),
              to: "/jokes/my-jokes",
              icon: <CgProfile size={26} />,
            }}
            onNavigate={handleNavigate}
          />
        )}

        <div>
          <button onClick={() => toggleGroup("explore")} className={groupHeader} type="button">
            <span className="text-lg">{t("sidebar.jokes.groups.explore")}</span>
            {openGroup === "explore" ? <MdExpandLess /> : <MdExpandMore />}
          </button>

          {openGroup === "explore" && (
            <div className="flex flex-col gap-2 mt-2">
              {exploreItems.map((item) => (
                <SidebarLink key={item.to} item={item} onNavigate={handleNavigate} />
              ))}
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleGroup("games")} className={groupHeader} type="button">
            <span className="text-lg">{t("sidebar.jokes.groups.games")}</span>
            {openGroup === "games" ? <MdExpandLess /> : <MdExpandMore />}
          </button>

          {openGroup === "games" && (
            <div className="flex flex-col gap-2 mt-2">
              {gameItems.map((item) => (
                <SidebarLink key={item.label} item={item} onNavigate={handleNavigate} />
              ))}
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleGroup("rankings")} className={groupHeader} type="button">
            <span className="text-lg">{t("sidebar.jokes.groups.rankings")}</span>
            {openGroup === "rankings" ? <MdExpandLess /> : <MdExpandMore />}
          </button>

          {openGroup === "rankings" && (
            <div className="flex flex-col gap-2 mt-2">
              {rankingItems.map((item) => (
                <SidebarLink key={item.to} item={item} onNavigate={handleNavigate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}