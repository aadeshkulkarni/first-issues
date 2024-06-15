"use client";

import React from "react";
import useFetch from "@/hooks/useFetchRepos";
import { Repo } from "@/schema/repo";

const Home = () => {
  const { isLoading, data: repos } = useFetch<Repo[]>({ url: "/api/repos" });

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        {repos?.map((repo) => (
          <div
            key={repo.name}
            className="rounded-md border-2 border-gray-200 bg-gray-100 p-4 cursor-pointer hover:scale-105 ease-in-out duration-300 "
          >
            <p className="text-lg font-semibold">{repo.name}</p>
            <p className="text-md text-slate-500">{repo.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
