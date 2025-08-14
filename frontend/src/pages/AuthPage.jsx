import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (mode !== "signup" && mode !== "signin") {
      navigate("/auth?mode=signin", { replace: true });
    }
  }, [mode, navigate]);

  if (mode === "signup") return <SignUp />;
  if (mode === "signin") return <SignIn />;
  return null;
};

export default AuthPage;
