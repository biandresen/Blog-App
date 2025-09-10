import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import registerContent from "../../text-content/register-page";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [input3Valid, setInput3Valid] = useState<boolean>(true);
  const [errorMsg3, setErrorMsg3] = useState<string>("");

  const [input4Valid, setInput4Valid] = useState<boolean>(true);
  const [errorMsg4, setErrorMsg4] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username, email, password, confirmPassword });
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{registerContent.infoHeading}</h2>
          <div>
            <h3 className="font-medium text-xl">{registerContent.infoListHeading}</h3>
            <hr className="mb-2" />
            <ul>
              {registerContent.infoListItems.map((list) => (
                <li className="list-disc ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="input-container">
        <h2 className="input-heading">{registerContent.inputHeading}</h2>
        <form action="">
          <Input
            id="username"
            label="Username"
            value={username}
            errorMsg={errorMsg1}
            placeholder="John92"
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              const isValid = value.length >= 2;
              //TODO Make an usernameIsValid helper function
              setInput1Valid(isValid);
              setErrorMsg1(isValid ? "" : "Username must be at least 2 characters long");
            }}
          />
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            errorMsg={errorMsg2}
            placeholder="john92@gmail.com"
            required
            inputValid={input2Valid}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              const isValid = value.includes("@") && value.includes(".");
              //TODO Make an emailIsValid helper function
              setInput2Valid(isValid);
              setErrorMsg2(isValid ? "" : "Please enter a valid email address");
            }}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            errorMsg={errorMsg3}
            placeholder="********"
            required
            inputValid={input3Valid}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              const isValid = value.length >= 6;
              //TODO Make an passwordIsValid helper function
              setInput3Valid(isValid);
              setErrorMsg3(isValid ? "" : "Password must be at least 6 characters long");
            }}
          />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            errorMsg={errorMsg4}
            placeholder="********"
            required
            inputValid={input4Valid}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              const isValid = value === password && value.length >= 6;
              //TODO Make an confirmPasswordIsValid helper function
              setInput4Valid(isValid);
              setErrorMsg4(isValid ? "" : "Passwords do not match");
            }}
          />
          <Button
            type="submit"
            variant="tertiary"
            onClick={handleSubmit}
            className="w-full mt-7"
            label={registerContent.button}
          >
            {registerContent.button}
          </Button>
          <div className="text-center">
            <Link to="/login" className="text-[var(--text1)] mt-3">
              {registerContent.goToLogin} <span className="font-bold">{registerContent.link}</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
