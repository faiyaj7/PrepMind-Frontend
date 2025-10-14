import React from "react";
import userProvider from "../store/userStore";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const user = userProvider((state) => state.user);
  const logOut = userProvider((state) => state.logOut);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  console.log(user)
  return (
    <div>
      <img src={user.profileImageUrl} alt="profile-image" className="size-11 bg-gray-300 rounded-full mr-3"/>
      <div className="text-[15px] text-black font-black leading-3">
        {user.name || ""}
      </div>
      <button
        className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;
