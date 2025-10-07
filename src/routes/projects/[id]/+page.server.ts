import { redirect } from "@sveltejs/kit";

export const load = async ({ params }) => {
  redirect(308, `/project/${encodeURIComponent(params.id)}`);
};
