import React from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  isLoading: boolean;
}

const ListLoader = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="gap-4 flex flex-col">
      <Skeleton className="w-full h-24 rounded-md" />
      <Skeleton className="w-full h-24 rounded-md" />
      <Skeleton className="w-full h-24 rounded-md" />
      <Skeleton className="w-full h-24 rounded-md" />
      <Skeleton className="w-full h-24 rounded-md" />
      <Skeleton className="w-full h-24 rounded-md" />
    </div>
  );
};

export default ListLoader;
