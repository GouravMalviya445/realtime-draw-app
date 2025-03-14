"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { toast } from "react-toastify";


export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
    }
  });

  const registerUser = handleSubmit(async (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      toast.info("Password and confirm password does not match");
      setLoading(false);
      return
    }
    try {
      const res = await apiClient.post("/users/signup", {
        email: data.email,
        name: data.name,
        password: data.password,
      });
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        router.push("/login");
        reset();
      }
    } catch (err: any) {
      setLoading(false);
      // console.log(err)
      if (err.response.data.statusCode === 500) {
        toast.error(err.response.data.message || "Internal server error")
      } 
      if (err.response.data.statusCode === 400) {
        toast.error(err.response.data.message || "Invalid inputs")
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-10">
      <div className="w-full sm:w-xl lg:w-md shadow-lg p-6 rounded-xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-10 mt-4 text-center">Create Account</h1>
        <form onSubmit={registerUser}>
          <div className="flex flex-col gap-y-4">
            {/* Email input field */}
            <Input
              type="email"
              label="Email"
              labelClassName="text-lg"
              containerClassName="flex justify-between"
              inputClassName="w-2/3"
              placeholder="name@example.com"
              {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email"
              }
              })}
            />
            {errors.email && <ErrorMessage message={errors.email.message ?? ""} />}

            {/* Name input field */}
            <Input
              label="Name"
              labelClassName="text-lg"
              containerClassName="flex justify-between"
              inputClassName="w-2/3"
              placeholder="John Doe"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
                maxLength: { value: 50, message: "Name must be at most 20 characters" }
              })}
            />
            {errors.name && <ErrorMessage message={errors.name.message ?? ""} />}

            {/* Password input field */}
            <Input
              label="Password"
              type="password"
              labelClassName="text-lg"
              containerClassName="flex justify-between"
              inputClassName="w-2/3"
              placeholder="*******"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                maxLength: { value: 50, message: "Password must be at most 20 characters" }
              })}
            />
            {errors.password && <ErrorMessage message={errors.password.message ?? ""} />}

            {/* Confirm Password input field */}
            <Input
              label="Confirm Pass"
              type="password"
              labelClassName="text-lg"
              containerClassName="flex justify-between"
              inputClassName="w-2/3"
              placeholder="*******"
              {...register("confirmPassword", {
              required: "Confirm Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 50, message: "Password must be at most 20 characters" }
              })}
            />
            {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message ?? ""} />}
            <Button className={`${loading ? "pointer-events-none bg-gray-400" : ""} grid place-content-center mt-4`} type="submit" variant="dark">
              {loading ? <span className="animate-spin h-6 w-6 rounded-full border-2 border-white border-t-transparent"/> : "Sign Up"}
            </Button>

            <div className="mt-3">
              <p className="text-center">Already have an account? 
                <Button size="sm" variant="link"><Link href="/login">Login</Link></Button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ErrorMessage({ message } : {message: string}) {
  return (
    <p className="text-red-500 text-center">{message}</p>
  )
}