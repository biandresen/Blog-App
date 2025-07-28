import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { type ChangeEvent } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValid?: boolean;
  errorMsg?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  inputValid,
  errorMsg,
  placeholder,
  required = false,
  disabled = false,
}: InputProps) => {
  const hasValue = value?.trim().length !== 0;

  return (
    <div className={`flex flex-col ${errorMsg && hasValue ? "-mb-1.5" : "mb-3"}`}>
      <label htmlFor={id} className="text-[var(--text1)] text-lg font-semibold">
        {label}
        {/* {required && <span className="ml-1">*</span>} */}
      </label>
      <div className="relative flex items-center -mt-0.5">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          // aria-invalid={!inputValid}
          className={`bg-[var(--bg)] text-[var(--text1)] font-semibold rounded-full w-full text-lg px-3 py-0.5 pr-9
            placeholder:text-gray-500 outline-none border
            ${inputValid === false && hasValue ? "border-[var(--error)]" : "border-transparent"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />

        {inputValid === true && hasValue ?
          <FaRegCheckCircle size={22} className="absolute right-2 text-[var(--success)]" aria-hidden />
        : null}
        {inputValid === false && hasValue ?
          <RxCrossCircled size={22} className="absolute right-2 text-[var(--error)]" aria-hidden />
        : null}
      </div>
      {errorMsg && hasValue ?
        <p className="text-[var(--error)] place-self-end -mt-1 text-[1rem]" role="alert">
          {errorMsg}
        </p>
      : null}
    </div>
  );
};

export default Input;
