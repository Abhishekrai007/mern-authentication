import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import RegisterAndLoginForm from "./RegisterAndLoginForm";

const Routes = () => {
  const { username } = useContext(UserContext);
  console.log(username);
  if (username) {
    return "logged in " + username;
  }
  return (
    <div>
      <RegisterAndLoginForm />
    </div>
  );
};

export default Routes;
