"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: "text" | "email" | "password"
}

export function Input({
  type = "text",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  label = "",
  ...props
}: InputProps) {
  return (
    <div className={`flex space-x-2 items-center ${containerClassName}`}>
      {label && <label className={`text-black font-semibold ${labelClassName}`} htmlFor={label}>{ label + ": "}</label>}
      <input type={type} {...props} id={label} className={`border rounded-md border-gray-500 focus:outline-none px-4 py-1 ${inputClassName}`} />
    </div>
  )
}