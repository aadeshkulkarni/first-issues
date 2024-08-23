import { Repo, Issue } from "@/schema";

const mapIssue = (issue: Issue) => {
  return {
    title: issue.title,
    html_url: issue.html_url,
    number: issue.number,
    comments_count: issue.comments,
    created_at: new Date(issue.created_at).toISOString(),
  };
};

const populateRepoDetails = async (owner: string, repo_name: string) => {
  try {
    console.log(`[${owner}/${repo_name}]: Getting info...`);

    const HEADERS = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "request",
      }
    };
    const metadataResponse = await fetch(`https://api.github.com/repos/${owner}/${repo_name}`,HEADERS);
    const metadata = await metadataResponse.json();

    const issuesResponse =  await fetch(
      `https://api.github.com/repos/${owner}/${repo_name}/issues?labels=${encodeURIComponent(
        "good first issue"
      )}&state=open&per_page=10&sort=created&direction=desc`,HEADERS
    );

    const issues = await issuesResponse.json();

    // Filters
    if(!("updated_at" in metadata)) {
      console.log(`[${owner}/${repo_name}]: Does not have last updated information.: `);
      return null;
    }
    if (metadata && metadata?.archived) {
      console.log(`[${owner}/${repo_name}]: Repository is archived.`);
      return null;
    }

    if (issues?.length < 3) {
      console.log(
        `[${owner}/${repo_name}]: Does not have enough good first issues.`
      );
      return null;
    }

    const { description, language, html_url, stargazers_count, updated_at, id } =
      metadata;

    const payload: Repo = {
      name: repo_name,
      owner,
      description,
      language,
      html_url: html_url,
      stars: stargazers_count,
      last_modified: updated_at ? new Date(updated_at).toISOString() : "",
      id: `${id}`,
      issues: issues?.map(mapIssue) ?? [],
    };

    return payload;
  } catch (e: any) {
    console.log(`[${owner}/${repo_name}]: ${e.message}`);
    return null;
  }
};

export const fetchInfoFromGithub = async (repos: string[]): Promise<Repo[]> => {
  const promises = repos.map((repo) => {
    const [owner, repo_name] = repo.split("/");
    return populateRepoDetails(owner, repo_name);
  });

  const responsesJSON = await Promise.allSettled(promises);
  const responses = responsesJSON
    .filter(
      (res): res is PromiseFulfilledResult<Repo> => res.status === "fulfilled"
    )
    .map((res) => res.value)
    .filter(Boolean);
  
  /* Disabling writing to json as data is now injected into MongoDB directly 
   * writeToRepoDetails(groupBy(responses, "language"));
   */
  return responses;
};
