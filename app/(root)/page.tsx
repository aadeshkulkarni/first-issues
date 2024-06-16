"use client";

import React from "react";
import useFetch from "@/hooks/useFetchRepos";
import { Repo } from "@/schema/repo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import ListLoader from "@/components/ListLoader";

const Home = () => {
  const { isLoading, data: repos } = useFetch<Repo[]>({ url: "/api/repos" });

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        <ListLoader isLoading={isLoading} />
        {repos?.map((repo) => (
          <Accordion key={repo.name} type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="border p-4 rounded-lg shadow-md"
            >
              <AccordionTrigger>
                <div className="text-left relative w-full">
                  <Link target="_blank" href={repo.url}>
                    <h1 className="text-lg font-semibold hover:underline">
                      {repo.owner} / {repo.name}
                    </h1>
                  </Link>
                  <h6 className="text-md text-slate-500">{repo.description}</h6>
                  <div className="flex flex-col justify-between pt-2 font-light">
                    <div>Stars: {repo.stars}</div>
                    <div>Lang: {repo.language}</div>
                    <div>
                      Last active: {dayjs(repo.last_modified).from(dayjs())}
                    </div>
                  </div>
                  <div className="absolute top-4 right-8 rounded-full border px-4 p-2 text-xs">
                    {repo.issues.length} issues
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t">
                {repo.issues.map((issue) => (
                  <div
                    key={issue.number}
                    className="grid grid-cols-12 border-b p-1 text-sm"
                  >
                    <div className="col-span-2">
                      <Link target="_blank" href={issue.url}>
                        <p className="text-slate-600 hover:underline cursor-pointer">
                          #{issue.number}
                        </p>
                      </Link>
                    </div>
                    <div className="col-span-9">{issue.title}</div>
                    <div className="col-span-1">
                      <div className="flex gap-2 items-center">
                        <MessagesSquare size="12px" />
                        {issue.comments_count}
                      </div>
                    </div>
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

const Loader = () => {};
