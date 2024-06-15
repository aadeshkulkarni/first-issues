import { getRepos } from "@/utils/getRepos";

const getRepoMetadata = async (repos: string[]) => {
  // fetch details for each repo
  const repoDetailPromises = repos.map((repo) =>
    fetch(`https://api.github.com/repos${repo}`).then((res) => res.json())
  );

  const repoMetadata = await Promise.allSettled(repoDetailPromises);

  return (
    repoMetadata
      .filter((item) => item.status === "fulfilled")
      // TODO: fix up the error here
      .map((item) => item.value)
  );
};

export const GET = async () => {
  try {
    const repos = await getRepos();
    const repoMetadata = await getRepoMetadata(repos);

    return new Response(JSON.stringify(repoMetadata), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
