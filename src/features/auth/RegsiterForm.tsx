import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import ProgressIcon from "@/components/Icons/ProgressIcon";
import Input from "@/components/Input";
import { useSignUpMutation } from "@/store/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, FormEvent, useState } from "react";

interface RegisterFormProps {
  setIsOpen?: (isOpen: boolean) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ setIsOpen }) => {
  const router = useRouter()
  const [signUp, { isLoading }] = useSignUpMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    surname: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      
      const { username, email, password, surname } = formData;
      const response = await signUp({ name: username, email, password, surname });

      if (response?.data?.status_code != "200") {
        console.log("Error occurred during registration");
      } else {
        setIsOpen && setIsOpen(false)
        router.push('/dashboard')
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={onSubmit}>
      <div className="relative">
          <Input
            name="username"
            label="Your name *"
            type="text"
            autoComplete="name"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative">
          <Input
            name="surname"
            label="Your surname *"
            type="text"
            autoComplete="surname"
            required
            value={formData.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative">
          <Input
            name="email"
            label="Your email address *"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
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

        <div className="flex flex-col-reverse sm:flex-row items-center mb-[23px] pb-[30px] border-b border-black-300 gap-y-2.5 sm:gap-y-0">
          <Button
            className="!max-w-full !w-full sm:!max-w-auto sm:!w-auto sm:mr-4 !h-[40px] justify-center uppercase !px-[15px]"
          >
            {isLoading ? (
              <ProgressIcon />
            ) : (
              <>
                Register
                <i className="las la-long-arrow-alt-right ml-2.5 text-ms"></i>
              </>
            )}
          </Button>
          <Checkbox
            required={true}
            label={
              <>
                I agree to the{" "}
                <Link href="#" className="underline hover:text-primary">
                  privacy policy
                </Link>{" "}
                *
              </>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
