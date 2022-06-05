import React, { useEffect, useContext } from "react";
import UserContext from "../UserContext";

const Dashboard = () => {
  const _userContext = useContext(UserContext);
  useEffect(() => {
    document.title = "Dashboard";

    console.log(_userContext.user);
  }, []);
  return (
    <>
      <div>Welcome :: {_userContext.user.currentUserName}</div>
    </>
  );
};

export default Dashboard;
