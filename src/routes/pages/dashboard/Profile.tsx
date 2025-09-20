import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import profileContent from "../../../text-content/profile-page";
import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import { deleteUser, updateUser } from "../../../lib/axios";
import type { UserUpdates } from "../../../types/general.types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { passwordValidator, userInputValidator, usernameValidator } from "../../../validators/auth";

const Profile = () => {
  const { user, setUser } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const infoListItemsVariables = [user?.username, user?.email];

  // Values
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>();
  const [avatar, setAvatar] = useState<string>(user?.avatar || "");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [input4Valid, setInput4Valid] = useState<boolean>(true);
  const [errorMsg4, setErrorMsg4] = useState<string>("");

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    toast.info("You have been logged out.");
    console.log("User logged out");
  };

  const handleDeleteProfile = async () => {
    try {
      console.log(user?.id);
      const res = await deleteUser(accessToken, Number(user?.id));
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Registration failed");
      }
      toast.success("Your profile has been deleted.");
      setUser(null);
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
    setAccessToken(null);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(accessToken, Number(user?.id), { username, email, password, avatar } as UserUpdates)
      .then((res) => {
        if (res.statusCode !== 200) {
          toast.error(res.message);
          throw new Error("Update failed");
        }
        toast.success("Profile updated successfully!");
        const { password, ...updatedUser } = res.data; // Exclude password from user context
        setUser({ id: user?.id, ...updatedUser });
      })
      .catch((err) => {
        console.error("Failed to update profile", err);
        toast.error("Failed to update profile");
      });
    console.log("Form submitted with:", { username, email, avatar });
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
              onClick={handleLogout}
              className="w-full"
              label={profileContent.button2}
            >
              {profileContent.button2}
            </Button>
            <Button
              type="button"
              variant="error"
              onClick={handleDeleteProfile}
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
            placeholder={""}
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setUsername(value);
              const validationResult = usernameValidator(value);
              setInput1Valid(!validationResult);
              setErrorMsg1(validationResult);
            }}
          />
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            errorMsg={errorMsg2}
            placeholder={""}
            required
            inputValid={input2Valid}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              const validationResult = userInputValidator(value);
              setInput2Valid(!validationResult);
              setErrorMsg2(validationResult);
            }}
          />
          <div className="flex relative">
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              label="Password"
              value={password}
              required
              inputValid={passwordErrors.length === 0}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setPasswordErrors(passwordValidator(value));
              }}
            />
            <Button
              aria-label="Show/Hide password"
              label="Show/Hide password"
              size="zero"
              className="bg-transparent absolute left-27 top-2"
            >
              {showPassword ?
                <FaEye onClick={() => setShowPassword((s) => !s)} size={20} className="text-[var(--text1)]" />
              : <FaEyeSlash
                  onClick={() => setShowPassword((s) => !s)}
                  size={20}
                  className="text-[var(--text1)]"
                />
              }
            </Button>
          </div>
          {passwordErrors.length > 0 && (
            <ul className="text-[0.9rem] text-[var(--error)] my-2">
              {passwordErrors.map((err) => (
                <li key={err}>• {err}</li>
              ))}
            </ul>
          )}
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
              setInput4Valid(isValid);
              setErrorMsg4(isValid ? "" : "Avatar must be a valid image file");
            }}
          />
          <Button
            type="submit"
            onClick={handleUpdateUser}
            className="w-full mt-7"
            label={profileContent.button1}
          >
            {profileContent.button1}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
