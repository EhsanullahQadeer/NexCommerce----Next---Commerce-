"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useUserUpdateMutation } from "@/store/api/authApi";
import { Tooltip } from "@mui/material";

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
  currentPassword?: string;
}

const AccountDetailsTab = () => {
  const [userUpdate] = useUserUpdateMutation();
  const data: any = useSelector((state) => state);
  const [formData, setFormData] = useState(data?.auth?.user || {});
  const [initialData, setInitialData] = useState(data?.auth?.user || {}); // Track the initial data

  useEffect(() => {
    if (data?.auth?.user) {
      setFormData(data?.auth?.user);
      setInitialData(data?.auth?.user); // Set initial data when user data changes
    }
  }, [data?.auth?.user]);

  const [errors, setErrors] = useState<FormErrors>({});

  const onChange = (key: any, val: any) => {
    let _vals = { ...formData };
    _vals[key] = val;

    if (val.trim() === "") {
      delete _vals[key];
    } else {
      // Clear error for the input if it has a value
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    setFormData(_vals);
  };

  const validate = (): FormErrors => {
    let validationErrors: FormErrors = {};

    // Required field validations
    if (!formData.name) {
      validationErrors.name = "First name is required";
    }
    if (!formData.surname) {
      validationErrors.surname = "Last name is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email address is invalid";
    }

    // Password validations
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        validationErrors.currentPassword =
          "Current password is required when updating password";
      }
      if (!formData.newPassword) {
        validationErrors.newPassword = "New password is required";
      }
      if (!formData.confirmPassword) {
        validationErrors.confirmPassword = "Confirm password is required";
      }
      if (
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword !== formData.confirmPassword
      ) {
        validationErrors.confirmPassword = "Passwords do not match";
      }
    }

    return validationErrors;
  };

  // Check if any field has changed
  const hasChanges = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialData),
    [formData, initialData]
  );

  const handleSave = async (e: any) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const dataToUpdate = {
      name: formData?.name,
      surname: formData?.surname,
      email: formData?.email,
      current_password: formData?.currentPassword || undefined,
      new_password: formData?.newPassword || undefined,
      new_password_confirmation: formData?.confirmPassword || undefined, // Use confirmPassword here
    };

    const response = await userUpdate({
      payload: dataToUpdate,
      fullPageLoader: true,
    });
    console.log(JSON.stringify(response));
  };

  return (
    <form className="mt-1.5" onSubmit={handleSave}>
      <div className="flex flex-col gap-[13px]">
        <div className="grid sm:grid-cols-2 gap-[13px] sm:gap-5">
          <Input
            label="First Name *"
            value={formData?.name}
            onChange={(e) => onChange("name", e.target.value)}
            error={errors.name}
          />
          <Input
            label="Last Name *"
            value={formData?.surname}
            onChange={(e) => onChange("surname", e.target.value)}
            error={errors.surname}
          />
        </div>
        <div>
          <Input
            label="Email *"
            value={formData?.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
          />
        </div>
        <div>
          <Input
            label="Current password (leave blank to leave unchanged)"
            onChange={(e) => onChange("currentPassword", e.target.value)}
            error={errors.currentPassword}
          />
        </div>
        <div>
          <Input
            label="New password (leave blank to leave unchanged)"
            onChange={(e) => onChange("newPassword", e.target.value)}
            error={errors.newPassword}
          />
        </div>
        <div>
          <Input
            label="Confirm new password (leave blank to leave unchanged)"
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
          />
        </div>
      </div>
      <Button
        variant={hasChanges ? "outlined" : "disabled"}
        className="uppercase mt-5"
        type="submit"
      >
        Save changes <i className="las la-long-arrow-alt-right ml-2.5"></i>
      </Button>
    </form>
  );
};

export default AccountDetailsTab;
