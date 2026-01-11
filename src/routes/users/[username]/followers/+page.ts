import type { User } from "$lib/index.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const res = await fetch(`https://api.hatch.lol/users/${encodeURIComponent(params.username)}`);
  const res2 = await fetch(
    `https://api.hatch.lol/users/${encodeURIComponent(params.username)}/followers`
  );
  if (!res.ok || !res2.ok) error(404);
  const user = (await res.json()) as User;
  const followers = res2.ok ? ((await res2.json()) as User[]) : [];
  return {
    user,
    followers
  };
};
