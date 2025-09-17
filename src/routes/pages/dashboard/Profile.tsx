import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { useUser } from "../../../contexts/UserContext";
import profileContent from "../../../text-content/profile-page";

const Profile = () => {
  const { user } = useUser();
  const infoListItemsVariables = [user?.username, user?.email];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO Here you would typically handle the registration logic, e.g., API call
    console.log("Form submitted with:", { username, email, password, avatar });
  };
  return (
    <div className="container inputInfo-container">
      <div>
        <div className="info-container flex flex-col">
          <div className="flex flex-col-reverse md:flex-row">
            <h2 className="text-2xl md:text-4xl my-3">{profileContent.infoHeading}</h2>
            <CgProfile size={60} className="lg:ml-30" />
          </div>
          <div className="mb-10 md:mb-0">
            <ul>
              {profileContent.infoListItems.map((list, index) => (
                <li className="text-xl md:text-2xl mt-2" key={list}>
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
              label={profileContent.button2}
            >
              {profileContent.button2}
            </Button>
            <Button
              type="button"
              variant="error"
              onClick={handleSubmit}
              className="w-full"
              label={profileContent.button3}
            >
              {profileContent.button3}
            </Button>
          </div>
        </div>
      </div>
      <div className="input-container">
        <h2 className="input-heading">{profileContent.inputHeading}</h2>
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
          <Button type="submit" onClick={handleSubmit} className="w-full mt-7" label={profileContent.button1}>
            {profileContent.button1}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
