import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { useUser } from "../../../contexts/UserContext";

const Admin = () => {
  const { user } = useUser();

  // Values
  const [username, setUsername] = useState<string>("Birando");

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const infoHeading = "ADMIN PANEL";

  const inputHeading = "UPDATE USERS";
  const buttonLabel1 = "GET USER";
  const buttonLabel2 = "REACTIVATE USER";
  const buttonLabel3 = "DELETE USER";

  const infoListItems = [
    "Get user profiles by username or email",
    "Delete/Reactivate user profiles",
    "Update user roles?",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username });
  };
  return (
    <div
      data-label="inputInfo-container"
      className="container flex flex-col-reverse gap-6 sm:flex-row sm:justify-center sm:gap-0 sm:mt-20!"
    >
      <div data-label="info-container">
        <div
          data-label="info"
          className="bg-[var(--primary)] px-4 py-6 rounded-xl sm:h-full sm:px-6 sm:rounded-tr-none sm:py-8 sm:rounded-br-none flex flex-col"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl my-4">{infoHeading}</h2>
          </div>
          <div className="mb-10 md:mb-0 px-6">
            <ol>
              {infoListItems.map((list) => (
                <li className="list-decimal list-inside text-xl md:text-2xl mt-2" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div
        data-label="input-container"
        className="bg-[var(--bg-input)] px-4 py-8 rounded-xl sm:px-6 sm:py-8 sm:rounded-tl-none sm:rounded-bl-none"
      >
        <h2 className="text-[var(--text1)] text-2xl md:text-4xl text-center mt-3 mb-5">{inputHeading}</h2>
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
            <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={buttonLabel1}>
              {buttonLabel1}
            </Button>
            <Button
              type="submit"
              variant="success"
              onClick={handleSubmit}
              className="w-full"
              label={buttonLabel2}
            >
              {buttonLabel2}
            </Button>
            <Button
              type="submit"
              variant="error"
              onClick={handleSubmit}
              className="w-full"
              label={buttonLabel3}
            >
              {buttonLabel3}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
