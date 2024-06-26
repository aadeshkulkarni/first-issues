import { readRepoDetails, readRepos } from "@/utils/helper";
import { populate } from "@/app/api/_scripts/populate";
import dayjs from "dayjs";

export const GET = async () => {
  try {
    const repoDetails = await readRepoDetails();

    if(!repoDetails) return new Response("No repo details found", { status: 404 });
    
    const countObj: Record<string, number> = {};

    Object.keys(repoDetails.details).forEach((lang) => {
      countObj[lang] = repoDetails.details[lang].length;
    });

    return new Response(JSON.stringify(countObj), { status: 200 });
  } catch (error) {
    return new Response("Failed to read repo details", {
      status: 500,
    });
  }
};
