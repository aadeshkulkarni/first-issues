export interface IIssue {
  title: string;
  url: string;
  number: number;
  comments_count: number;
  created_at: string;
  html_url: string;
  comments: number;
}

export interface IRepo {
  name: string;
  owner: string;
  description: string;
  language: string;
  url: string;
  stars: number;
  last_modified: string;
  id: string;
  issues: IIssue[];
}
