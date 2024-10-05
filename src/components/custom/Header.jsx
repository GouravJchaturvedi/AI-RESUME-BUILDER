import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    const handleUserStateChange = () => {
      setIsLoading(true); // Set loading to true when user state changes
      const timer = setTimeout(() => {
        setIsLoading(false); // Stop loading after a short delay
      }, 500); // Adjust time as necessary

      return () => clearTimeout(timer); // Clean up on unmount
    };

    handleUserStateChange();
  }, [isSignedIn]); // Effect runs when the sign-in state changes

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" alt="logo" width={60} height={60} />
      {!isLoading && ( // Render buttons only when loading is complete
        isSignedIn ? (
          <div className="flex gap-2 items-center rounded-xl">
            <Link to={"/dashboard"}>
              <Button className="rounded-xl flex items-center">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button className="rounded-xl flex mt-2 items-center">Get Started</Button>
          </Link>
        )
      )}
    </div>
  );
}

export default Header;
