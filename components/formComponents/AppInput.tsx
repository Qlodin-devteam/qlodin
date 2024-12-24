"use client";

import { HTMLAttributes, memo, useEffect, useRef, useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";

export type AppInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value?: string;
  name: string;
  type?: string;
  textarea?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  ps?: string;
  title?: string;
  rows?: number;
  error?: string[];
  onChange?: (value: string) => void;
  inputProps?: HTMLAttributes<HTMLInputElement> & any
};

export default memo(function AppInput({
  icon,
  placeholder,
  value = '',
  name,
  type = "text",
  onChange,
  textarea = false,
  ps,
  title,
  readonly,
  hidden,
  rows,
  error: fieldError,
  inputProps,
}: AppInputProps) {
  const [val, setVal] = useState(value);
  const [eyeOpen, setEyeOpen] = useState(false);

  useEffect(()=>{
    setVal(value);
  }, [value])


  return (
    <div className={hidden ? 'hidden' : '' + "font-switzer"}>
      {title && (
        <label
          htmlFor={`${title}-input`}
          className="inline-block pb-1 text-black-300 text-base"
        >
          {title}
        </label>
      )}
      <div className="relative AppInput z-[1]">
        <span
          className={`absolute inline-block left-3 opacity-60 ${
            textarea ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
        {
          type === 'password' &&
          <button
          type="button"
          role="button"
            onClick={() => setEyeOpen(!eyeOpen)}
            className={`absolute inline-block right-3 ${textarea ? "top-4" : "top-1/2 -translate-y-1/2"
              }`}
          >
            {
              eyeOpen
                ? <HiEye />
                : <HiEyeOff />
            }
          </button>
        }
        {textarea ? (
          <textarea
          readOnly={readonly}
          hidden={hidden}
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            rows={rows ?? 4}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${!icon ? "ps-3" : "ps-9"} ${
              (fieldError) ? "!bg-red-100" : ""
            }`}
          />
        ) : (
          <input
          {...inputProps}
          readOnly={readonly}
          hidden={hidden}
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            type={!eyeOpen ? type : 'text'}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${ps ? ps : !icon ? "ps-4" : "ps-9"}  ${
              (fieldError) ? "!bg-red-100" : ""
            }`}
          />
        )}
      </div>
      {fieldError && fieldError.length > 0 && (
        <p className="text-red-900 text-xs">{fieldError[0]}</p>
      )}
    </div>
  );
});