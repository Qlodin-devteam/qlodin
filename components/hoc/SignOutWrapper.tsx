"use client";

import { __cookies, __paths } from "@/utils";
import { useCookie, useEffectOnce } from "react-use";

export default function SignOutWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [, , deleteToken] = useCookie(__cookies.user_token);

  useEffectOnce(() => {
    deleteToken();
    window.location.href = __paths.signIn;
  });

  return children;
}
