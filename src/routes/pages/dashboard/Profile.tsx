import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import profileContent from "../../../text-content/profile-page";
import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import { deleteUser, logoutUser, updateUser } from "../../../lib/axios";
import { passwordValidator, userInputValidator, usernameValidator } from "../../../validators/auth";
import { useNavigate } from "react-router-dom";
import { safeRequest } from "../../../lib/auth";
import Modal from "../../../components/molecules/Modal";
import Avatar from "../../../components/atoms/Avatar";

const MAX_AVATAR_SIZE = 6 * 1024 * 1024; // 6MB upload (compresses on backend)

const Profile = () => {
  const { user, setUser } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const infoListItemsVariables = [user?.username, user?.email];

  // Values
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>();
  const [avatar, setAvatar] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Validation states
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string>("");

  const navigate = useNavigate();

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
    logoutUser();
    navigate("/login");
    toast.info("You have been logged out.");
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await safeRequest(deleteUser, accessToken, setAccessToken, Number(user?.id));

      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Deletion failed");
      }

      toast.success("Your profile has been deleted.");
      setUser(null);
      setAccessToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete profile", error);
      toast.error("Failed to delete profile");
    }
    setShowModal(false);
  };

  const handleDeleteButton = () => {
    setShowModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const updates: any = { username, email, password };
    if (avatar) updates.avatar = avatar;

    try {
      const res = await safeRequest(updateUser, accessToken, setAccessToken, Number(user?.id), updates);

      if (res.statusCode !== 200) throw new Error(res.message);

      toast.success("Profile updated successfully!");
      setUser(res?.data);
      // setUser({id: res?.data?.id, username: res?.data?.username, email: res?.data?.email, avatar: res?.data?.avatar, role: res?.data?.role, createdAt: res?.data?.createdAt, updatedAt: res?.data?.updatedAt});
    } catch (err: any) {
      if (err?.response?.data.message === "File too large") {
        toast.error("Avatar file size exceeds the limit. Max size is 6MB.");
        return;
      }
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container inputInfo-container">
      <Modal
        isOpen={showModal}
        title="Delete user"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteProfile}
        onCancel={() => setShowModal(false)}
      />
      <div>
        <div className="info-container flex flex-col">
          <div className="flex flex-col-reverse md:flex-row ">
            <h2 className="text-2xl md:text-4xl my-3 lg:mr-10">{profileContent.infoHeading}</h2>
            <Avatar size={80} avatarUrl={user?.avatar} />
          </div>
          <div className="mb-10 md:mb-0">
            <ul>
              {profileContent.infoListItems.map((list, index) => (
                <li className="text-xl md:text-2xl mt-2" key={list}>
                  {list} <span className="font-bold break-all">{infoListItemsVariables[index]}</span>
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
              onClick={handleDeleteButton}
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
          <div className="flex flex-col relative">
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
              {showPassword ? (
                <FaEye onClick={() => setShowPassword((s) => !s)} size={20} className="text-[var(--text1)]" />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword((s) => !s)}
                  size={20}
                  className="text-[var(--text1)]"
                />
              )}
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
            title="Upload a new avatar image (optional)"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) {
                setAvatar(null);
                setAvatarPreview(null);
                setAvatarError("");
                return;
              }

                if (!ALLOWED_TYPES.includes(file.type)) {
                setAvatarError("Only JPG, PNG or WEBP images are allowed.");
                return;
              }

              if (file.size > MAX_AVATAR_SIZE) {
                setAvatar(null);
                setAvatarPreview(null);
                setAvatarError(`Avatar file size exceeds ${MAX_AVATAR_SIZE / (1024 * 1024)}MB. Choose a smaller file.`);
                return;
              }

              setAvatar(file);
              setAvatarError("");
              // create a temporary preview URL
              setAvatarPreview(URL.createObjectURL(file));
            }}
          />
          <p className="text-xs text-gray-400 mb-3 mt-[-10px]">
            Max size: {MAX_AVATAR_SIZE / (1024 * 1024)}MB. Supported formats: JPG, JPEG, WEBP, PNG.
          </p>


          {/* Preview */}
          {avatarPreview && (
            <img src={avatarPreview} alt="Avatar Preview" className="rounded-full w-20 h-20 object-cover" />
          )}

          {avatarError && <p className="text-red-500">{avatarError}</p>}

          <Button
            type="submit"
            onClick={handleUpdateUser}
            className="w-full mt-7"
            label={profileContent.button1}
            disabled={!!avatarError} // disable if avatar too big
          >
            {profileContent.button1}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
