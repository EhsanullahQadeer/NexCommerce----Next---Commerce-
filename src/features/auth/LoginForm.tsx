"use client";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressIcon from "@/components/Icons/ProgressIcon";

const LoginForm = () => {
  const router = useRouter();
  const userDetails = useAppSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: username,
        password,
      });
      if (response.data.errors || !response.data.data) {
        console.log("Incorrect username or password.");
      } else {
        localStorage.setItem("access_token", response.data.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <form className="space-y-4">
        <div className="relative">
          <Input
            name="email"
            label="Username or email address *"
            type="email"
            autoComplete="username"
            required
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div className="relative">
          <Input
            name="password"
            label="Password *"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-[23px] pb-[30px] border-b border-black-300 gap-y-[6px] sm:gap-y-0">
          <div className="w-full flex flex-col-reverse sm:flex-row">
            <Button
              onClick={onSubmit}
              className="!max-w-full !w-full sm:!max-w-[115px] sm:!w-full !h-[40px] !px-[15px] sm:mr-4 mt-2.5 sm:mt-0 justify-center uppercase"
            >
              {isLoading ? (
                <ProgressIcon />
              ) : (
                <>
                  Log in
                  <i className="las la-long-arrow-alt-right ml-2.5 text-sm"></i>
                </>
              )}
            </Button>
            <Checkbox label="Remember me" labelClass="whitespace-nowrap" />
          </div>
          <Link
            href=""
            className="text-sm text-black-100 font-extralight leading-[26.04px] whitespace-nowrap"
          >
            Forgot Your Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
