"use client";

import { getSession, login } from "@/app/actions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (state?.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="text" name="username" required placeholder="username" />
      <input type="password" name="password" required placeholder="password" />
      <button>Login</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginForm;
