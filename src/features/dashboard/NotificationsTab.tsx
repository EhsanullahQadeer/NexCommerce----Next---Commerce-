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
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      <p className="text-sm font-normal mb-4 text-black-500">
        Manage your notification preferences for email and SMS.
      </p>

      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-lg">
          <div className="">
            <p className="text-sm">Email Notifications</p>
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
            <p className="text-sm">SMS Notifications</p>
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
