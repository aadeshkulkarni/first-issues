"use client";

import React from "react";
import useFetch from "@/hooks/useFetchRepos";
import { Repo } from "@/schema/repo";
import mockData from "@/data/mock.json";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  /* 
  Temporarily commenting this out to work with mock data
  const { isLoading, data: repos } = useFetch<Repo[]>({ url: "/api/repos" });
  */
  console.log(mockData);
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        {mockData?.map((repo) => (
          <Accordion key={repo.name} type="single" collapsible>
            <AccordionItem value="item-1" className="border p-4 rounded-lg shadow-md">
              <AccordionTrigger>
                <div className="text-left relative w-full">
                  <h1 className="text-lg font-semibold">{repo.name}</h1>
                  <h6 className="text-md text-slate-500">{repo.description}</h6>
                  <div className="flex flex-col justify-between pt-2 font-light">
                    <div>Stars: {repo.stargazers_count}</div>
                    <div>Lang: {repo.language}</div>
                    <div>Last active: {repo.updated_at}</div>
                  </div>
                  <div className="absolute top-4 right-8 rounded-full border px-4 p-2 text-xs">
                    {repo.issues.length} issues
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t">
                {repo.issues.map((issue) => (
                  <div key={issue.number} className="grid grid-cols-12 border-b p-1 text-sm">
                    <div className="col-span-2">{issue.number}</div>
                    <div className="col-span-9">{issue.title}</div>
                    <div className="col-span-1">{issue.comments}</div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </main>
  );
};

export default Home;
