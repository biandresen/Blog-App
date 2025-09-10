import { CgProfile } from "react-icons/cg";
import { useState } from "react";

import { useUser } from "../../../contexts/UserContext";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import adminContent from "../../../text-content/admin-page";

const Admin = () => {
  const { user } = useUser();

  // Values
  const [username, setUsername] = useState<string>("Birando");

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username });
  };
  return (
    <div className="container inputInfo-container">
      <div>
        <div className="info-container">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl my-4">{adminContent.infoHeading}</h2>
          </div>
          <div className="mb-10 md:mb-0 px-6">
            <ol>
              {adminContent.infoListItems.map((list) => (
                <li className="list-decimal list-inside text-xl md:text-2xl mt-2" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div data-label="input-container" className="input-container">
        <h2 className="input-heading">{adminContent.inputHeading}</h2>
        <form action="">
          <Input
            id="username"
            label="Username"
            value={username}
            errorMsg={errorMsg1}
            //TODO Add exisiting username as placeholder
            placeholder={""}
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
          <div className="grid place-items-center mt-8 mb-3 xl:mb-0 md:ml-auto text-[var(--text1)]">
            <CgProfile size={40} />
            <p className="font-bold">{username}</p>
            <p className="">{"Status: Active"}</p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={adminContent.button1}>
              {adminContent.button1}
            </Button>
            <Button
              type="submit"
              variant="success"
              onClick={handleSubmit}
              className="w-full"
              label={adminContent.button2}
            >
              {adminContent.button2}
            </Button>
            <Button
              type="submit"
              variant="error"
              onClick={handleSubmit}
              className="w-full"
              label={adminContent.button3}
            >
              {adminContent.button3}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
