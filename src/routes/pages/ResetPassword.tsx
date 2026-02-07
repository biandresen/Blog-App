import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { passwordValidator } from "../../validators/auth";

import resetPasswordContent from "../../text-content/reset-password-page";
import { newPassword } from "../../lib/axios";

const ResetPassword = () => {
  useEffect(() => {
    toast.info("Please reset your password.");
  }, []);

  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const invalidForm = !input2Valid || !password || !passwordConfirmation;

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invalidForm) return;
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    try {
      const res = await newPassword(token, password);
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Password reset failed");
      }
      toast.success(res.message || "Password reset successful! You can now login with your new password.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Try again later");
      console.log(err);
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{resetPasswordContent.infoHeading}</h2>
          <div>
            <h3 className="font-medium text-xl">{resetPasswordContent.infoListHeading}</h3>
            <hr className="mb-2" />
            <ol>
              {resetPasswordContent.infoListItems.map((list) => (
                <li className="ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
      <div className="input-container">
        <h2 className="input-heading">{resetPasswordContent.inputHeading}</h2>
        <form action="">
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
          <div className="flex relative">
            <Input
              id="passwordConfirmation"
              type={!showPassword2 ? "password" : "text"}
              label="Confirm Password"
              value={passwordConfirmation}
              errorMsg={errorMsg2}
              placeholder="********"
              required
              inputValid={input2Valid}
              onChange={(e) => {
                const value = e.target.value;
                setPasswordConfirmation(value);
                const isValid = value === password;
                setInput2Valid(isValid);
                setErrorMsg2(isValid ? "" : "Passwords do not match");
              }}
            />
            <Button
              aria-label="Show/Hide password"
              label="Show/Hide password"
              size="zero"
              className="bg-transparent absolute left-50 top-2"
            >
              {showPassword2 ? (
                <FaEye
                  onClick={() => setShowPassword2((s) => !s)}
                  size={20}
                  className="text-[var(--text1)]"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword2((s) => !s)}
                  size={20}
                  className="text-[var(--text1)]"
                />
              )}
            </Button>
          </div>
          <Button
            type="submit"
            variant="tertiary"
            onClick={handleSubmit}
            className="w-full mt-7"
            disabled={invalidForm}
            label={resetPasswordContent.button}
          >
            {resetPasswordContent.button}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
