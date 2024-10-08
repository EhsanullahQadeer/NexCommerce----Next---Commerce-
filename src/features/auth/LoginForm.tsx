"use client";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { useLoginMutation } from "@/store/api/authApi";
import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressIcon from "@/components/Icons/ProgressIcon";
import Cookies from "js-cookie";
import routes from "@/routes/routes";
interface LoginFormProps {
  setIsOpen?: (isOpen: boolean) => void;
  onClose?: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ setIsOpen }) => {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { username, password } = formData;
      const response = await login({
        email: username,
        password,
      });
      localStorage.setItem("access_token", response.data.data.token);
      Cookies.set("access_token", response.data.data.token);
      setIsOpen && setIsOpen(false);

      router.push(routes.home);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="relative">
          <Input
            name="username"
            label="Email address *"
            type="email"
            autoComplete="username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative">
          <Input
            name="password"
            label="Password *"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-[23px] pb-[30px] border-b border-black-300 gap-y-[6px] sm:gap-y-0">
          <div className="w-full flex flex-col-reverse sm:flex-row">
            <Button className="!max-w-full !w-full sm:!max-w-[115px] sm:!w-full !h-[40px] !px-[15px] sm:mr-4 mt-2.5 sm:mt-0 justify-center uppercase">
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
