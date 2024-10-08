"use client";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";


const DashboardTab: FC= () => {
  const data: any = useSelector(state => state)
  const {email, name} = data?.auth?.user || {}
  return (
    <div className="mt-1.5">
      <p className="text-black-500 font-extralight text-sm leading-[30.01px]">
        Hello <span className="font-normal text-black-75">{name || "User"}</span> (not{' '}
        <span className="font-normal text-black-75">{name || "User"}</span>?{' '}
        <Link href="/login" className="text-primary">Log out</Link>)
        <br />
        From your account dashboard you can view your{' '}
        <Link href="/dashboard/orders" className="text-primary underline">
          recent orders
        </Link>
        , manage your{' '}
        <Link href="/dashboard/addresses" className="text-primary">
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link href="/dashboard/account-details" className="text-primary">
          edit your password and account details
        </Link>
        .
      </p>
    </div>
  );
};

export default DashboardTab;
