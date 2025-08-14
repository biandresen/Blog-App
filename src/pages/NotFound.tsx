import img404 from "../assets/img/404.png";
import Button from "../components/atoms/Button";

const heading = "SORRY! PAGE NOT FOUND";
const body = "Get back on track by clicking the button below to return to the home page.";
const button1Title = "GO TO HOME PAGE";

const NotFound = () => {
  return (
    <div
      data-label="home-page-container"
      className="text-center container md:my-auto! flex flex-col-reverse md:justify-center md:items-center sm:gap-5 w-[90%] md:w-1/2"
    >
      <div data-label="home-content-container">
        <h1 className="heading-theme text-[calc(1.8rem+1.5vw)] -mt-3 leading-9">{heading}</h1>
        <p className="theme-text3 font-semibold text-[calc(0.9rem+1vw)] leading-5.5 md:leading-8 mt-2 mb-8">
          {body}
        </p>
        <Button className="w-full lg:text-3xl" variant="tertiary" label={button1Title}>
          {button1Title}
        </Button>
      </div>
      <img
        className="mx-auto mt-[calc(1rem+2vw)] sm:mt-10 w-[calc(250px+12vw)] lg:-mt-20"
        src={img404}
        alt="books"
      />
    </div>
  );
};

export default NotFound;
