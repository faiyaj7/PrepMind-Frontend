import React from "react";
import userProvider from "../../store/userStore";

const Dashboard = () => {
  const user = userProvider((state) => state.user);
  console.log("from provider", user);
  return <div>Dashboard</div>;
};

export default Dashboard;
