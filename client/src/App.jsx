import Register from "./RegisterAndLoginForm";
import axios from "axios";
import { UserContext, UserContextProvider } from "./UserContext";
import { useContext } from "react";
import Routes from "./Routes";
function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <div className="bg-red-500">
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </div>
  );
}

export default App;
