import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import HomePage from "./dashboard/components/HomePage";
import Footer from "./components/custom/Footer";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const location = useLocation();
  const [count, setCount] = useState(0);

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }

  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {isLandingPage && <HomePage />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
