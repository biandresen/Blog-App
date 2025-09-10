import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import loginContent from "../../text-content/login-page";

const Login = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { userInput, password });
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{loginContent.infoHeading}</h2>
          <div>
            <h3 className="font-medium text-xl">{loginContent.infoListHeading}</h3>
            <hr className="mb-2" />
            <ul>
              {loginContent.infoListItems.map((list) => (
                <li className="list-disc ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="input-container">
        <h2 className="input-heading">{loginContent.inputHeading}</h2>
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
          <Button
            type="submit"
            variant="tertiary"
            onClick={handleSubmit}
            className="w-full mt-7"
            label={loginContent.button}
          >
            {loginContent.button}
          </Button>
          <div className="text-center">
            <Link to="/register" className="text-[var(--text1)] mt-3">
              {loginContent.goToRegister} <span className="font-bold">{loginContent.link}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
