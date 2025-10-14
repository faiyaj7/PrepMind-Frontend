import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { passwordValidators } from "../constants";

const PasswordStrengthMeter = ({ register, value }) => {
  const [isVisisble, setIsVisible] = useState(false);
  const [strength, setStrength] = useState({
    width: "0%",
    text: "",
    color: "bg-gray-400",
  });

  useEffect(() => {
    const pwd = value || "";
    let score = 0;

    if (/(?=.*[a-z]){5,}/.test(pwd)) score += 1;
    if (/(?=.*[A-Z]){5,}/.test(pwd)) score += 1;
    if (/(?=.*[0-9]){5,}/.test(pwd)) score += 1;
    if (/(?=.*[!,%,&,@,#,$,^,*,?,_,~]){5,}/.test(pwd)) score += 1;

    // Determine strength level
    if (pwd.length === 0) {
      setStrength({ width: "0%", text: "weaker", color: "bg-gray-400" });
    } else if (score === 1) {
      setStrength({ width: "40%", text: "weak", color: "bg-red-600" });
    } else if (score === 2) {
      setStrength({ width: "60%", text: "fair", color: "bg-yellow-400" });
    } else if (score === 3) {
      setStrength({ width: "80%", text: "good", color: "bg-blue-400" });
    } else if (score === 4) {
      setStrength({ width: "100%", text: "strong", color: "bg-green-400" });
    }
  }, [value]);
  const checklistRef = useRef([]);

  const rules = {
    minLength: value?.length >= 8,
    lowercase: /[a-z]/.test(value),
    uppercase: /[A-Z]/.test(value),
    number: /[0-9]/.test(value),
    specialChar: /[@!#$%^&()]/.test(value),
  };

  useGSAP(() => {
    // GSAP Animation for checklist items
    checklistRef.current.forEach((el, index) => {
      gsap.to(el, {
        color: rules[Object.keys(rules)[index]] ? "#16a34a" : "#dc2626", // green/red
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    });
  });

  return (
    <div className="flex flex-col items-start justify-center w-full bg-white rounded-lg">
      <div className="relative w-full">
        <input
          {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#$%^&()]){8,}/,
              message: "Please Enter a Valid Password",
            },
          })}
          type={isVisisble ? "text" : "password"}
          placeholder="Enter the Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
        />
        <div
          className="absolute top-[48%] -translate-y-[50%] right-6 cursor-pointer text-orange-500"
          onClick={() => setIsVisible(!isVisisble)}
        >
          {isVisisble ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className={`${strength.color} h-full transition-all duration-500`}
          style={{ width: strength.width }}
        ></div>
      </div>

      <div className="ml-auto capitalize">
        <span
          className={`font-semibold text-xs ${
            strength.text === "weaker" ? "opacity-0" : "opacity-100"
          }`}
        >
          {strength.text}
        </span>
      </div>
      {/* Checklist */}
      <ul className="mt-3 text-xs">
        {passwordValidators.map((rule, index) => (
          <li
            key={index}
            ref={(el) => (checklistRef.current[index] = el)}
            className="flex items-center mb-2"
          >
            {rules[rule.key] ? (
              <FaCheck className="mr-2 text-green-500" />
            ) : (
              <FaTimes className="mr-2 text-red-500" />
            )}
            {rule.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;
