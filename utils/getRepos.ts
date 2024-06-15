import { promises as fs } from "fs";

export const getRepos = async (): Promise<string[]> => {
  try {
    const file = await fs.readFile(process.cwd() + "/data/repos.json", "utf8");
    const data = JSON.parse(file);

    return data.repos;
  } catch (error) {
    throw new Error("Failed to read repos.json");
  }
};
