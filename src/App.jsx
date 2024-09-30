import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [count, setCount] = useState(0);

  // if(!isSignedIn && isLoaded){
  //   return <Navigate to="/auth/sign-in"/>
  // }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
