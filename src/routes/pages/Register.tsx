import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import registerContent from "../../text-content/register-page";
import { usernameValidator, emailValidator, passwordValidator } from "../../validators/auth";

import { registerUser } from "../../lib/axios";
// import { safeRequest } from "../../lib/auth";

const Register = () => {
  const { setAccessToken, setIsAuthenticated } = useAuth();
  const { setUser } = useUser();

  useEffect(() => {
    toast.info("Welcome! Please register to create an account.");
  }, []);

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  // const [input3Valid, setInput3Valid] = useState<boolean>(true);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [input4Valid, setInput4Valid] = useState<boolean>(true);
  const [errorMsg4, setErrorMsg4] = useState<string>("");

  const invalidForm =
  !input1Valid ||
  !input2Valid ||
  passwordErrors.length > 0 ||
  !input4Valid ||
  !username ||
  !email ||
  !password ||
  !passwordConfirmation ||
  !acceptedTerms;


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (invalidForm) {
    toast.error("Please fill out the form correctly before submitting.");
    return;
  }

  try {
    const res = await registerUser({
      username,
      email,
      password,
      passwordConfirmation,
      acceptedTerms,
    });

    if (res.statusCode !== 201) {
      toast.error(res.message ?? "Registration failed");
      return;
    }

    const { accessToken, user, needsEmailVerification } = res.data;

    // Future-ready: stop here if you later require email verification
    if (needsEmailVerification) {
      toast.info("Please verify your email to continue.");
      navigate("/check-email");
      return;
    }

    // Save auth
    setAccessToken(accessToken);
    setIsAuthenticated(true);

    // Canonical fetch is best (keeps app state consistent)
    // If you don't want /me, you can setUser(user) directly.
    // const meRes = await safeRequest(getMe, accessToken, setAccessToken);
    setUser(user);

    toast.success(`Welcome, ${user.username}!`);
    navigate("/jokes/daily-joke");
  } catch (err: any) {
    // Your registerUser rejects with either errors[] or {message}
    if (Array.isArray(err)) {
      toast.error("Correct the highlighted errors and try again.");
      err.forEach((error: { field: string; message: string }) => {
        switch (error.field) {
          case "username":
            setInput1Valid(false);
            setErrorMsg1(error.message);
            break;
          case "email":
            setInput2Valid(false);
            setErrorMsg2(error.message);
            break;
          case "password":
            setPasswordErrors([error.message]);
            break;
          case "passwordConfirmation":
            setInput4Valid(false);
            setErrorMsg4(error.message);
            break;
          case "acceptedTerms":
            // optionally show UI feedback next to checkbox
            break;
        }
      });
      return;
    }

    toast.error(err?.message ?? "Registration failed");
  }
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
            placeholder="john92@gmail.com"
            required
            inputValid={input2Valid}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              const validationResult = emailValidator(value);
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
              placeholder="********"
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
            id="passwordConfirmation"
            type="password"
            label="Confirm Password"
            value={passwordConfirmation}
            errorMsg={errorMsg4}
            placeholder="********"
            required
            inputValid={input4Valid}
            onChange={(e) => {
              const value = e.target.value;
              setPasswordConfirmation(value);
              const isValid = value === password;
              setInput4Valid(isValid);
              setErrorMsg4(isValid ? "" : "Passwords do not match");
            }}
          />

          <label className="mt-4 flex items-start gap-2 text-sm text-[var(--text1)]">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the{" "}
              <Link to="/legal/terms" className="underline font-semibold">Terms</Link>{" "}
              and{" "}
              <Link to="/legal/rules" className="underline font-semibold">Community Rules</Link>.
            </span>
          </label>

          <Button
            type="submit"
            variant="tertiary"
            onClick={handleSubmit}
            className={`w-full mt-7 ${invalidForm ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={invalidForm}
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
