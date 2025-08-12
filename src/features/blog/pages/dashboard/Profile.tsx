import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Input from "../../../../components/atoms/Input";
import Button from "../../../../components/atoms/Button";
import { useUser } from "../../../../contexts/UserContext";

const Profile = () => {
  const { user } = useUser();

  // Values
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [input3Valid, setInput3Valid] = useState<boolean>(true);
  const [errorMsg3, setErrorMsg3] = useState<string>("");

  const [input4Valid, setInput4Valid] = useState<boolean>(true);
  const [errorMsg4, setErrorMsg4] = useState<string>("");

  const infoHeading = "PROFILE DATA";
  const infoListItems = ["Username: ", "Email: ", "Number of active posts: ", "Number of drafts: "];
  const infoListItemsVariables = [user?.username, user?.email, 5, 2];

  const inputHeading = "UPDATE PROFILE";
  const buttonLabel1 = "UPDATE";
  const buttonLabel2 = "LOGOUT";
  const buttonLabel3 = "DELETE PROFILE";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username, email, password, avatar });
  };
  return (
    <div
      data-label="inputInfo-container"
      className="container flex flex-col-reverse gap-6 sm:flex-row sm:justify-center sm:gap-0 sm:mt-20!"
    >
      <div data-label="info-container" className="">
        <div
          data-label="info"
          className="bg-[var(--primary)] px-4 py-6 rounded-xl sm:h-full sm:px-6 sm:rounded-tr-none sm:py-8 sm:rounded-br-none flex flex-col"
        >
          <div className="flex">
            <h2 className="text-2xl my-3">{infoHeading}</h2>
            <CgProfile size={70} className="ml-10 md:ml-30" />
          </div>
          <div>
            <ul>
              {infoListItems.map((list, index) => (
                <li className="text-lg mt-2" key={list}>
                  {list} <span className="font-bold">{infoListItemsVariables[index]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 mt-auto">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSubmit}
              className="w-full"
              label={buttonLabel2}
            >
              {buttonLabel2}
            </Button>
            <Button
              type="button"
              variant="error"
              onClick={handleSubmit}
              className="w-full"
              label={buttonLabel3}
            >
              {buttonLabel3}
            </Button>
          </div>
        </div>
      </div>
      <div
        data-label="input-container"
        className="bg-[var(--bg-input)] px-4 py-8 rounded-xl sm:px-6 sm:py-8 sm:rounded-tl-none sm:rounded-bl-none"
      >
        <h2 className="text-[var(--text1)] text-3xl text-center my-3">{inputHeading}</h2>
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
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            errorMsg={errorMsg2}
            //TODO Add exisiting email as placeholder
            placeholder={""}
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
            id="avatar"
            type="file"
            label="Avatar"
            value={avatar}
            errorMsg={errorMsg4}
            inputValid={input4Valid}
            onChange={(e) => {
              const value = e.target.value;
              setAvatar(value);
              const isValid = value === password && value.length >= 6;
              //TODO Make an avatarIsValid helper function
              setInput4Valid(isValid);
              setErrorMsg4(isValid ? "" : "Avatar must be a valid image file");
            }}
          />
          <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={buttonLabel1}>
            {buttonLabel1}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
