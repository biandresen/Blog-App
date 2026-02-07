import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import forgotPasswordContent from "../../text-content/forgot-password-page";
import { emailValidator } from "../../validators/auth";
import { resetPassword } from "../../lib/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const [newLinkCounter, setNewLinkCounter] = useState<number>(60);

  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const invalidForm = !input1Valid || !email;

  useEffect(() => {
    toast.info("Enter your email.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invalidForm) return;

    setNewLinkCounter(60);
    const countdown = setInterval(() => {
      setNewLinkCounter((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setEmailSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const res = await resetPassword({ email });
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Failed to send reset password email");
      }
      setEmailSent(true);
      toast.success(`Info sent to ${email}. Check spam folder if you don't see the email.`);
    } catch (err: any) {
      toast.error("Correct the error and try again.");
      setErrorMsg1(err.message || "Failed to send reset password email");
    }
  };

  return (
    <div className="inputInfo-container container">
      <div>
        <section className="info-container">
          <h2 className="text-2xl my-3">{forgotPasswordContent.infoHeading}</h2>
          <div>
            <h3 className="font-medium text-xl">{forgotPasswordContent.infoListHeading}</h3>
            <hr className="mb-2" />
            <ol>
              {forgotPasswordContent.infoListItems.map((list) => (
                <li className="ml-4 text-lg" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="input-container">
        <h2 className="input-heading">{forgotPasswordContent.inputHeading}</h2>
        <form action="">
          <Input
            id="email"
            label="Email"
            value={email}
            errorMsg={errorMsg1}
            placeholder="john@gmail.com"
            required
            inputValid={input1Valid}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              const validationResult = emailValidator(value);
              setInput1Valid(!validationResult);
              setErrorMsg1(validationResult);
            }}
          />
          <Button
            type="submit"
            variant="tertiary"
            disabled={(invalidForm || emailSent) && newLinkCounter > 0}
            onClick={handleSubmit}
            className="w-full mt-7 disabled:cursor-not-allowed disabled:opacity-50"
            label={forgotPasswordContent.button}
          >
            {forgotPasswordContent.button}
          </Button>
          <div className="text-center flex flex-col">
            <p className="text-[var(--text1)] mt-3">
              {forgotPasswordContent.newLink}{" "}
              {newLinkCounter > 0 && emailSent ? (
                <span className="font-bold block">{`Send again in ${newLinkCounter} seconds`}</span>
              ) : (
                <span className="font-bold">{"Try again"}</span>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
