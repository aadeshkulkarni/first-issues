import { repoStore } from "@/store/repo-store";
import { RepoDetails } from "@/schema";
import { fetchInfoFromGithub } from "@/scripts/populate";
import { promises as fs } from "fs";
import path from "path";
import dayjs from "dayjs";

export const readRepos = async (): Promise<string[]> => {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "data/repos.json"),
      "utf8"
    );
    const data = JSON.parse(file);

    return data;
  } catch (error) {
    throw new Error(`Failed to read repos.json - ${error}`);
  }
};

export const readRepoDetails = async (): Promise<RepoDetails> => {
  try {
    const data = repoStore.read();
    return data;
  } catch (error) {
    throw new Error(`Failed to read repo details - ${error}`);
  }
};

export const writeToRepoDetails = (content: RepoDetails["details"]) => {
  repoStore.write(content);
};

export const getRepoMetadata = async (repos: string[]) => {
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
      const response = await fetchInfoFromGithub(repos);
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};

export const groupBy = (data: any[], key: string) => {
  return data.reduce((acc, y) => {
    (acc[y[key]] = acc[y[key]] || []).push(y);
    return acc;
  }, {});
};
