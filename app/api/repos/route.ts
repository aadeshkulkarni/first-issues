import { readRepoDetails, readRepos } from "@/utils/helper";
import { populate } from "@/app/api/_scripts/populate";
import dayjs from "dayjs";
import { NextApiRequest } from "next";

const getRepoMetadata = async (repos: string[]) => {
  try {
    const repoDetailsFile = await readRepoDetails();

    if (
      dayjs().diff(dayjs(repoDetailsFile.last_modified), "hours") <
      Number(process.env.REPO_CACHE_TIME)
    ) {
      console.log("Returning from cache...");
      return Object.values(repoDetailsFile.details).flat();
    } else {
      const response = await populate(repos);
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};

export const GET = async (req: NextApiRequest) => {
  try {
    const url = new URL(req.url || "");
    const lang = url.searchParams.get("lang")?.toLowerCase() || "";

    const repos = await readRepos();
    const repoMetadata = await getRepoMetadata(repos);

    const filteredByLang = lang
      ? repoMetadata?.filter((repo) => repo.language.toLowerCase() === lang)
      : repoMetadata;

    // [TODO]: Apply pagination here
    // total records, current page, records per page

    return new Response(JSON.stringify(filteredByLang), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
