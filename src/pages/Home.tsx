import homeImg from "../assets/img/home-img.png";
import Button from "../components/atoms/Button";

const heading = "Read and write interesting posts!";
const body = "Use the comment sections on your favorite posts to engage and create communities!";
const button1Title = "REGISTER";
const button2Title = "VIEW POSTS";

const Home = () => {
  return (
    <div
      data-label="home-page-container"
      className="container md:my-auto! md:flex md:flex-row-reverse md:justify-center md:items-center sm:gap-5"
    >
      <div data-label="home-content-container">
        <h1 className="heading-theme text-[calc(1.8rem+1.5vw)] mt-[calc(1rem+2vw)] leading-9">{heading}</h1>
        <p className="theme-text3 font-semibold text-[calc(0.9rem+1vw)] leading-5.5 md:leading-8 mt-[calc(0.5rem+0.8vw)]">
          {body}
        </p>
        <div className="flex mt-[calc(1.3rem+2vw)] gap-3 w-1/1 md:flex-row md:w-full justify-between">
          <Button className="w-[45%]" variant="tertiary" label={button1Title}>
            {button1Title}
          </Button>
          <Button className="w-[45%]" variant="secondary" label={button1Title}>
            {button2Title}
          </Button>
        </div>
      </div>
      <img className="mx-auto mt-[calc(1rem+2vw)] sm:mt-10 w-[calc(250px+12vw)]" src={homeImg} alt="books" />
    </div>
  );
};

export default Home;
