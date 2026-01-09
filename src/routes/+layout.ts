import type { LayoutLoad } from "./$types";
import type { User } from "$lib";
import { browser } from "$app/environment";

export const load: LayoutLoad = async () => {
  if (!browser) return {
    user: null
  };

  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const githubToken = hashParams.get("token");
  if (!localStorage.getItem("token") && githubToken) {
    localStorage.setItem("token", githubToken)
  }

  const token = localStorage.getItem("token");
  if (!token) return {
    user: null
  };
  const res = await fetch("https://api.hatch.lol/auth/me", {
    headers: {
      Token: token
    }
  });
  if (res.ok) return {
    user: await res.json() as User
  };
  console.error(res);
  return {
    user: null
  };
};
