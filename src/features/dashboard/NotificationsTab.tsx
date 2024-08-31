import { cn } from "@/lib/utils";
import { useState } from "react";

const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const toggleEmailNotifications = () => {
    setEmailNotifications((prev) => !prev);
  };

  const toggleSmsNotifications = () => {
    setSmsNotifications((prev) => !prev);
  };

  return (
    <div className="mt-1.5 flex-1">
      <h1
        className={`text-[22px] sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
      >
        Notifications
      </h1>

      <p className="text-black-500 font-extralight text-sm mb-2.5 leading-[30.1px]">
        Manage your notification preferences for email and SMS.
      </p>

      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-lg">
          <div className="">
            <p className=" font-extralight leading-[30.1px]">
              Email Notifications
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailNotifications}
              onChange={toggleEmailNotifications}
            />
            <div
              className={cn(
                "w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary",
                "peer"
              )}
            >
              <div
                className={cn(
                  "dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
                  emailNotifications ? "transform translate-x-full" : ""
                )}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg">
          <div className="">
            <p className=" font-extralight leading-[30.1px]">
              SMS Notifications
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={smsNotifications}
              onChange={toggleSmsNotifications}
            />
            <div
              className={cn(
                "w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary",
                "peer"
              )}
            >
              <div
                className={cn(
                  "dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
                  smsNotifications ? "transform translate-x-full" : ""
                )}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
