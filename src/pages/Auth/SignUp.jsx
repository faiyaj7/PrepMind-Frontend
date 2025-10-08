import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import ProfileImageSelector from "../../components/ProfileImageSelector";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
 
  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2">
          <ProfileImageSelector
            image={profilePic}
            setImage={setProfilePic}
            preview={preview}
            setPreview={setPreview}
          />
          <input
            {...register("fullname", {
              required: true,
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the email"
          />
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^\d+@gmail\.com$/,
                message: "Email Invalid",
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the email"
          />
          <PasswordStrengthMeter
            register={register}
            value={watch("password")}
          />
          {Array.from(errors)?.map((error, index) => (
            <p key={index} className="text-red-500 text-xs pb-2.5">
              {error}
            </p>
          ))}
          <button className="btn_primary" type="submit">
            Sign Up
          </button>
          <p className="text-[13px] text-slate-800">
            Already an Account?
            <button
              className="font-medium text_primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              {"  "}
              SignIn
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
