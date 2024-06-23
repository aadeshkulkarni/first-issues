import React from "react";
import { Badge } from "./ui/badge";
const filters = [
  "Python",
  "Typescript",
  "Javascript",
  "Go",
  "C++",
  "Java",
  "PHP",
  "C#",
  "Rust",
  "C",
  "Scala",
];
const Filter = () => {
  return (
    <div className="py-4">
      <h2 className="uppercase font-semibold text-md py-4 text-slate-700 dark:text-slate-300">BROWSE BY LANGUAGE</h2>
      <div className="flex flex-wrap gap-4">
        {filters.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
};

export default Filter;
