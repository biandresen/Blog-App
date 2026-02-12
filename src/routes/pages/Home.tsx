import { NavLink } from "react-router-dom";

import homeImg from "../../assets/img/laughing-dad-c.png";
import homeContent from "../../text-content/home-page";
import { useUser } from "../../contexts/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="container md:my-auto! md:flex md:flex-row md:justify-center md:items-center sm:gap-5">
      <img
        className="mx-auto mt-[calc(1rem+2vw)] sm:mt-10 w-[calc(220px+12vw)]"
        src={homeImg}
        alt="stack of books"
      />

      <section className="w-[90%] mx-auto md:w-full">
        <h1 className="text-[var(--text3)] text-[calc(1.8rem+1.5vw)] mt-[calc(1rem+2vw)] leading-9">
          {homeContent.heading}
        </h1>
        <p className="text-[var(--text3)] font-semibold text-[calc(0.9rem+1vw)] leading-5.5 md:leading-8 lg:leading-10 mt-[calc(0.5rem+0.8vw)]">
          {homeContent.paragraph}
        </p>
        <div className="flex mt-[calc(1.3rem+2vw)] gap-3 w-full md:flex-row md:w-full justify-between">
          {user ? (
            <NavLink to="/dashboard" className={"bg-[var(--button3)] text-[var(--text0)] nav-link"}>
              {homeContent.button0}
            </NavLink>
          ) : (
            <NavLink to="/register" className={"bg-[var(--button3)] text-[var(--text0)] nav-link"}>
              {homeContent.button1}
            </NavLink>
          )}

          <NavLink to="/jokes/daily-joke" className={"bg-[var(--button5)] nav-link text-[var(--text0)] outline-[var(--button3)] outline-3"}>
            {homeContent.button2}
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
