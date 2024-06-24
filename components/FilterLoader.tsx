import React from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  isLoading: boolean;
}

const FilterLoader = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="gap-2 flex flex-wrap">
      <Skeleton className="w-24 h-8 rounded-md" />
      <Skeleton className="w-24 h-8 rounded-md" />
      <Skeleton className="w-24 h-8 rounded-md" />
      <Skeleton className="w-24 h-8 rounded-md" />
      <Skeleton className="w-24 h-8 rounded-md" />
    </div>
  );
};

export default FilterLoader;
