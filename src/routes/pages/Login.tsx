import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { type User } from "../../types/context.types";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import loginContent from "../../text-content/login-page";
import { loginUser } from "../../lib/axios";
import { userInputValidator, loginPasswordValidator } from "../../validators/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const navigate = useNavigate();
  const invalidForm = !input1Valid || !input2Valid || !userInput || !password;

  const { setAccessToken } = useAuth();
  const { setUser, setLoggedIn } = useUser();

  useEffect(() => {
    toast.info("Welcome! Please login to your account.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invalidForm) return;
    try {
      const res = await loginUser({ userInput, password });
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Login failed");
      }

      // Save access token
      setAccessToken(res.data);

      // OPTION 1: Decode token
      const payload: User = jwtDecode(res.data);
      setUser({
        id: payload.id,
        username: payload.username,
        email: payload.email,
        avatar: payload.avatar,
        role: payload.role,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt,
      });

      setLoggedIn(true);
      toast.success(`Welcome back, ${payload.username}!`);
      setTimeout(() => {
        navigate("/posts");
      }, 200);
    } catch (err: any) {
      toast.error("Correct the error(s) and try again.");
      setErrorMsg2(err.message || "Login failed");
    }
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
              const validationResult = userInputValidator(value);
              setInput1Valid(!validationResult);
              setErrorMsg1(validationResult);
            }}
          />
          <div className="flex relative">
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              label="Password"
              value={password}
              errorMsg={errorMsg2}
              placeholder="********"
              required
              inputValid={input2Valid}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                const validationResult = loginPasswordValidator(value);
                setInput2Valid(!validationResult);
                setErrorMsg2(validationResult);
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
