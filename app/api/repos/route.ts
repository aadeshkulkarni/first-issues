import { readRepos } from "@/utils/helper";
import { populate } from "@/app/api/_scripts/populate";

const getRepoMetadata = async (repos: string[]) => {
  try {
    const response = await populate(repos);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const GET = async () => {
  try {
    const repos = await readRepos();
    const repoMetadata = await getRepoMetadata(repos);

    return new Response(JSON.stringify(repoMetadata), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
