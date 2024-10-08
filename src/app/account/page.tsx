"use client";
import useLogout from "@/hooks/useLogout";
import routes from "@/routes/routes";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const DashboardTab: FC = () => {
  const data: any = useSelector((state) => state);
  const router = useRouter();
  const { email, name } = data?.auth?.user || {};
  const { handleLogout } = useLogout();
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLogout();
    router.push("/auth");
  };
  return (
    <div className="mt-1.5">
      <p className="text-black-500 font-extralight text-sm leading-[30.01px]">
        Hello{" "}
        <span className="font-normal text-black-75">{name || "User"}</span> (not{" "}
        <span className="font-normal text-black-75">{name || "User"}</span>?{" "}
        <span onClick={handleLogoutClick} className="text-primary cursor-pointer">
          Log out
        </span>
        )
        <br />
        From your account dashboard you can view your{" "}
        <Link href={routes.orders} className="text-primary underline">
          recent orders
        </Link>
        , manage your{" "}
        <Link href={routes.addresses} className="text-primary">
          shipping and billing addresses
        </Link>
        , and{" "}
        <Link href={routes.accountDetails} className="text-primary">
          edit your password and account details
        </Link>
        .
      </p>
    </div>
  );
};

export default DashboardTab;
