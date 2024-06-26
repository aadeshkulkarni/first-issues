import { RepoDetails } from "@/schema/repoDetails";

let instance: RepoStore;

class RepoStore {
  last_modified?: string;
  details: RepoDetails["details"] = {};

  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  write(content: RepoDetails["details"]) {
    this.last_modified = new Date().toISOString();
    this.details = content;
  }

  read() {
    return { details: this.details, last_modified: this.last_modified };
  }
}

export const repoStore = new RepoStore();
