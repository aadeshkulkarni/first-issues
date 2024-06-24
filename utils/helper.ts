import { RepoDetails } from "@/schema/repoDetails";
import { promises as fs } from "fs";

export const readRepos = async (): Promise<string[]> => {
  try {
    const file = await fs.readFile(process.cwd() + "/data/repos.json", "utf8");
    const data = JSON.parse(file);

    return data;
  } catch (error) {
    throw new Error("Failed to read repos.json");
  }
};

export const readRepoDetails = async (): Promise<RepoDetails> => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/data/repo_details.json",
      "utf8"
    );
    const data = JSON.parse(file);

    return data;
  } catch (error) {
    throw new Error("Failed to read repos.json");
  }
};

export const writeToRepoDetails = (content: RepoDetails) => {
  fs.writeFile(
    process.cwd() + "/data/repo_details.json",
    JSON.stringify(content, null, 2)
  );
};
