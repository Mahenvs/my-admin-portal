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
  
  let profile;
  const [formData, setFormData] = useState(InitialState);

  const [isEdited, setEdited] = useState({
    email: false,
    password: false,
    cnfpassword: false,
  });

  const handlerInput = (flag, value) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [flag]: value,
    }));

    setEdited((prevValues) => ({
      ...prevValues,
      [flag]: true,
    }));
  };
  useEffect(() => {
    profile = profileInfo?.[0];
    console.log(profile);
  }, [profileInfo]);
  return (
    <CustomForm class1="shadow-md border text-slate-800 border-slate-400">
      <h3 className="text-slate-800 text-2xl  justify-start  mt-[1.5rem] font-bold mb-[1rem]">
        {"Profile Information"}
      </h3>
      {profileInfo?.map((item, index) => (
        <div className="mx-auto flex flex-col text-slate-900 gap-3" key={index}>
          {[
            { label: "User Name :", value: item?.email },
            { label: "Store ID :", value: item?.id },
            { label: "First Name :", value: item?.firstName },
            { label: "Last Name :", value: item?.lastName ? 'NA' : 'NA'},
            { label: "Address :", value: item?.address ? '' : 'NA' },
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
      {/* <Button title="Save" class="mt-5"></Button> */}
    </CustomForm>
  );
};

export default Profile;
