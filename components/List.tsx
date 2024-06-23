import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import ListLoader from "@/components/ListLoader";
import useFetch from "@/hooks/useFetchRepos";
import { Repo } from "@/schema/repo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "./ui/badge";
dayjs.extend(relativeTime);

const List = () => {
  const { isLoading, data: repos } = useFetch<Repo[]>({ url: "/api/repos" });
  return (
    <>
      <ListLoader isLoading={isLoading} />
      {repos?.map((repo) => (
        <Accordion key={repo.name} type="single" collapsible className="my-2">
          <AccordionItem
            value="item-1"
            className="border border-slate-500 dark:border-slate-700 px-4 rounded-md"
          >
            <AccordionTrigger>
              <div className="text-left relative w-full">
                <div className="flex justify-between">
                  <Link target="_blank" href={repo.url}>
                    <h1 className="inline text-lg text-slate-800 dark:text-slate-300 font-semibold hover:underline py-2">
                      <span className="capitalize">{repo.owner}</span> /{" "}
                      <span className="capitalize">{repo.name}</span>
                    </h1>
                  </Link>
                  <Badge variant="outline">{repo.issues.length} issues</Badge>
                </div>
                <h6 className="text-md text-slate-800 dark:text-slate-400">{repo.description}</h6>
                <div className="flex gap-x-4 py-2 font-light text-slate-800 dark:text-slate-400">
                  <div>Stars: {repo.stars}</div>
                  <div>Lang: {repo.language}</div>
                  <div>Last active: {dayjs(repo.last_modified)?.from(dayjs())}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t">
              {repo.issues.map((issue) => (
                <div
                  key={issue.number}
                  className="grid grid-cols-12 p-1 text-sm text-slate-800 dark:text-slate-400"
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
    </>
  );
};

export default List;
