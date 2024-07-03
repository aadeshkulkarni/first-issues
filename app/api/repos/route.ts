import { readRepoDetails, readRepos } from "@/utils/helper";
import { populate } from "@/app/api/_scripts/populate";
import dayjs from "dayjs";

interface RepoType {
  total: Number,
  pages: Number,
  current: Number,
  recordsPerPage: Number,
  data: any,
}

const getRepoMetadata = async (repos: string[]) => {
  try {
    const repoDetailsFile = await readRepoDetails();

    if (
      repoDetailsFile.last_modified &&
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

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url || "");
    const lang = url.searchParams.get("lang")?.toLowerCase() || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "100"); // TODO: Change 100 to 10 once UI is implemented.

    const repos = await readRepos();
    const repoMetadata = await getRepoMetadata(repos);

    const filteredByLang = lang
      ? repoMetadata?.filter((repo) => repo.language.toLowerCase() === lang)
      : repoMetadata;

    const totalRecords = filteredByLang?.length || 0;
    const totalPages = Math.ceil(totalRecords / limit);
    const paginatedData = filteredByLang?.slice((page - 1) * limit, page * limit); 

    const response: RepoType = {
      total: totalRecords,
      pages: totalPages,
      current: page,
      recordsPerPage: limit,
      data: paginatedData,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch prompts created by user - ${error}`, {
      status: 500,
    });
  }
};
