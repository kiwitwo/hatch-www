import type { Comment, Project, User } from "$lib/index.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const res = await fetch(`https://api.hatch.lol/users/${encodeURIComponent(params.username)}`);
  const res2 = await fetch(
    `https://api.hatch.lol/users/${encodeURIComponent(params.username)}/comments`
  );
  const res3 = await fetch(
    `https://api.hatch.lol/users/${encodeURIComponent(params.username)}/projects`
  );
  if (!res.ok || !res2.ok) error(404);
  const user = (await res.json()) as User;
  const commentsObject = (await res2.json()) as { [key: string]: Comment };
  const projects = (await res3.json()) as Project[];
  let comments: Comment[] = [];
  for (let key of Object.keys(commentsObject)) {
    comments.unshift(commentsObject[key]);
  }
  return {
    ...user,
    comments: comments,
    projects: projects.sort((a, b) => b.id - a.id)
  };
};
