import Link from "next/link";
import { FC } from "react";

interface DashboardTabProps {
  handleTabChange: (tab: number) => void;
}

const DashboardTab: FC<DashboardTabProps> = ({ handleTabChange }) => {
  return (
    <div className="mt-1.5">
      <p className="text-black-500 font-extralight text-sm leading-[30.01px]">
        Hello <span className="font-normal text-black-75">User</span> (not{' '}
        <span className="font-normal text-black-75">User</span>?{' '}
        <Link href="/login" className="text-primary">Log out</Link>)
        <br />
        From your account dashboard you can view your{' '}
        <Link href="#" className="text-primary underline" onClick={() => handleTabChange(2)}>
          recent orders
        </Link>
        , manage your{' '}
        <Link href="#tab-address" className="text-primary" onClick={() => handleTabChange(4)}>
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link href="#" className="text-primary" onClick={() => handleTabChange(5)}>
          edit your password and account details
        </Link>
        .
      </p>
    </div>
  );
};

export default DashboardTab;
