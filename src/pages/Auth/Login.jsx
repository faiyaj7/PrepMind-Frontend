import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import axiosInstance from "../../utils/axiosInstance";
import { apiRoutes } from "../../utils/apiRoute";
import { useNavigate } from "react-router-dom";
import { handleTryCatch } from "../../utils/handleTryCatch";
import { toast } from "react-hot-toast";
import userProvider from "../../store/userStore";

const Login = ({ setCurrentPage }) => {
  const updateUser = userProvider((state) => state.updateUserInformation);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleTryCatch(async (data) => {
    const response = await axiosInstance.post(apiRoutes.AUTH.LOGIN, data);
    const { token } = response.data;
    console.log(response.data);
    if (token) {
      localStorage.setItem("token", token);
      updateUser(response.data.authUser);
    }
    toast.success(response.message);
    navigate("/dashboard");
  });

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please Enter your details to log in.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Login */}
        <div className="">
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^.+@gmail\.com$/,
                message: "Email Invalid",
              },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        {/* Password */}
        <div className="">
          <PasswordStrengthMeter
            register={register}
            value={watch("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn_primary">
          Login
        </button>
      </form>
      <p className="text-[13px] text-slate-800">
        Don&apos;t have an account?
        <button
          className="font-medium text_primary underline cursor-pointer"
          onClick={() => setCurrentPage("signup")}
        >
          SignUp
        </button>
      </p>
    </div>
  );
};

export default Login;
