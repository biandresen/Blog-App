import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { Link } from "react-router-dom";

const Login = () => {
  // Values
  const [userInput, setUserInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const infoHeading = "Login to read blogs!";
  const infoListHeading = "News and updates:";
  const infoListItems = ["No news at the moment", "No updates at the moment"];

  const inputHeading = "LOGIN";
  const buttonLabel = "LOGIN";

  const goToRegister = "Don't have an account?";
  const register = "Register";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { userInput, password });
  };

  return (
    <div
      data-label="inputInfo-container"
      className="container flex flex-col-reverse gap-6 sm:flex-row sm:gap-0 sm:mt-20!"
    >
      {/* //TODO Fix boarders on sm+ */}
      <div data-label="info-container">
        <div data-label="info" className="bg-[var(--primary)] px-4 py-6 rounded-xl sm:h-full sm:px-6 sm:py-8">
          <h2 className="text-2xl my-3">{infoHeading}</h2>
          <div>
            <h3 className="font-medium text-xl">{infoListHeading}</h3>
            <hr className="mb-2" />
            <ul>
              {infoListItems.map((list) => (
                <li className="list-disc ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* //TODO Fix boarders on sm+ */}
      <div data-label="input-container" className="bg-[var(--bg-input)] px-4 py-8 rounded-xl sm:px-6 sm:py-8">
        <h2 className="text-[var(--text1)] text-3xl text-center my-3">{inputHeading}</h2>
        <form action="">
          <Input
            id="userInput"
            label="Username/Email"
            value={userInput}
            errorMsg={errorMsg1}
            placeholder="John92/john@gmail.com"
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setUserInput(value);
              const isValid = value.length >= 2;
              //TODO Make an userInputIsValid helper function
              setInput1Valid(isValid);
              setErrorMsg1(isValid ? "" : "UserInput must be at least 2 characters long");
            }}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            errorMsg={errorMsg2}
            placeholder="********"
            required
            inputValid={input2Valid}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              const isValid = value.length >= 6;
              //TODO Make an passwordIsValid helper function
              setInput2Valid(isValid);
              setErrorMsg2(isValid ? "" : "Password must be at least 6 characters long");
            }}
          />
          <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={buttonLabel}>
            {buttonLabel}
          </Button>
          <div className="text-center">
            <Link to="/register" className="text-[var(--text1)] mt-3">
              {goToRegister} <span className="font-bold">{register}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
