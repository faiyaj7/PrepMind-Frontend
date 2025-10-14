import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import ProfileImageSelector from "../../components/ProfileImageSelector";
import { handleTryCatch } from "../../utils/handleTryCatch";
import { apiRoutes } from "../../utils/apiRoute";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userProvider from "../../store/userStore";
const SignUp = ({ setCurrentPage }) => {
  const updateUser = userProvider((state) => state.updateUserInformation);

  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // any changes made to the data passed on onsubmit will not change after entering it
  // so to add image into the data instead of setvalue we are directly adding the profileImageUrl
  const onSubmit = handleTryCatch(async (data) => {
    if (profilePic) {
      const profileImageUrl = await uploadImage(profilePic);
      data.profileImageUrl = profileImageUrl;
    }

    const response = await axiosInstance.post(apiRoutes.AUTH.REGISTER, data);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token);
      updateUser(response.data.userData);
    }
    toast.success(response.message);
    navigate("/dashboard");
  });
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
            {...register("name", {
              required: true,
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            placeholder="Enter the username"
          />
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^.+@gmail\.com$/,
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
            placeholder="Enter the email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <PasswordStrengthMeter
            register={register}
            value={watch("password")}
          />
          {Object.values(errors)
            ?.filter((err) => err?.message)
            .map((error, index) => (
              <p key={index} className="text-red-500 text-sm pb-2.5">
                {error.message}
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
