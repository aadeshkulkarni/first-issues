export interface sortProp {
  label?: string;
  value?: string;
  order?: string;
}

export const sortOptions: sortProp[] = [
  {
    label: "Last Active",
    value: "last_active",
    order: "desc",
  },
  {
    label: "Stars",
    value: "stars",
    order: "desc",
  },
  {
    label: "Issue count",
    value: "num_of_issues",
    order: "desc",
  },
];
