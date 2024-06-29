import { repoStore } from "@/store/repo-store";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url || "");
    const lang = url.searchParams.get("lang")?.toLowerCase() || "";

    const repoDetailsFile = repoStore.read();
    const repoMetadata = Object.values(repoDetailsFile.details).flat();

    console.log("repoDetailsFile", repoDetailsFile.last_modified);
    const filteredByLang = lang
      ? repoMetadata?.filter((repo) => repo.language.toLowerCase() === lang)
      : repoMetadata;

    // [TODO]: Apply pagination here
    // total records, current page, records per page

    return new Response(JSON.stringify(filteredByLang), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch prompts created by user - ${error}`, {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
