import { repoStore } from "@/app/api/_store/repo-store";
import { RepoDetails } from "@/schema/repoDetails";
import { promises as fs } from "fs";
import path from "path";

export const readRepos = async (): Promise<string[]> => {
  try {
    const file = await fs.readFile(path.join(process.cwd(), 'data/repos.json'), "utf8");
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

export const writeToRepoDetails = (content: RepoDetails['details']) => {
  repoStore.write(content);
};

export const groupBy = (data: any[], key: string) => {
  return data.reduce((acc, y) => {
    (acc[y[key]] = acc[y[key]] || []).push(y);
    return acc;
  }, {});
};
