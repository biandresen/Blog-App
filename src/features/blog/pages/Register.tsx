import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";

const Register = () => {
  // Values
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [input3Valid, setInput3Valid] = useState<boolean>(true);
  const [errorMsg3, setErrorMsg3] = useState<string>("");

  const [input4Valid, setInput4Valid] = useState<boolean>(true);
  const [errorMsg4, setErrorMsg4] = useState<string>("");

  const infoHeading = "Register to get access!";
  const infoListHeading = "You will be able to:";
  const infoListItems = [
    "Create your own blog posts",
    "Comment on other posts",
    "Create and attach tags to your posts",
    "Manage your profile",
  ];

  const inputHeading = "REGISTER";
  const buttonLabel = "REGISTER";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username, email, password, confirmPassword });
  };

  return (
    <div data-label="inputInfo-container" className="container flex flex-col-reverse gap-6">
      <div data-label="info-container">
        <div data-label="info" className="bg-[var(--primary)] p-4 rounded-xl">
          <h2 className="text-2xl mb-5">{infoHeading}</h2>
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
      <div data-label="input-container" className="bg-[var(--bg-input)] p-4 rounded-xl">
        <h2 className="text-[var(--text1)] text-3xl text-center m-3">{inputHeading}</h2>
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
          <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={buttonLabel}>
            {buttonLabel}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
