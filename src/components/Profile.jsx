import React, { useEffect, useState } from "react";
import CustomForm from "../UI_Elements/CustomForm";
import CustomFormLabel from "../UI_Elements/CustomFormLabel";
import CustomFormControl from "../UI_Elements/CustomFormControl";
import Button from "../UI_Elements/Button";
import { useGetProfile } from "../Hooks/useGetProfile";
import { useSelector } from "react-redux";

const InitialState = {
  email: "",
  password: "",
  cnfpassword: "",
};
const Profile = () => {
  useGetProfile();
  const profileInfo = useSelector((store) => store.store.profileData);
  
  useEffect(() => {
  }, [profileInfo]);
  return (
    <CustomForm class1="shadow-md border text-slate-800 border-slate-400 shadow-slate-400">
      <h3 className="text-slate-800 text-2xl justify-start font-bold mb-[1rem]">
        {"Profile Information"}
      </h3>
      {profileInfo?.map((item, index) => (
        <div className="mx-auto flex flex-col text-slate-900 gap-3" key={index}>
          {[
            { label: "User Name :", value: item?.email },
            { label: "Store ID :", value: item?.id },
            { label: "First Name :", value: item?.firstName },
            { label: "Last Name :", value: item?.lastName ? item?.lastName : 'NA'},
            { label: "Address :", value: item?.address ? item?.address : 'NA' },
            { label: "Mobile  :", value: item?.phoneNumber ? item?.phoneNumber : 'NA' },
          ].map((field, fieldIndex) => (
            <span
              className="flex justify-between items-center gap-4"
              key={fieldIndex}
            >
              <CustomFormLabel
                label={field.label}
                class="font-medium text-lg flex justify-center "
              />
              <CustomFormLabel
                label={field.value}
                class="font-medium text-xl font-mono"
              />
            </span>
          ))}
        </div>
      ))}
    </CustomForm>
  );
};

export default Profile;
