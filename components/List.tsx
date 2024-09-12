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
import { Repo } from "@/schema";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "./ui/badge";
import { sortProp } from "@/utils/constants";
import Image from "next/image";
dayjs.extend(relativeTime);

interface Props {
  langFilter: string;
  sortFilter: sortProp;
  starsRange: {
    max_stars: number;
    min_stars: number;
  };
}

const List = ({ langFilter, sortFilter, starsRange }: Props) => {

  langFilter = encodeURIComponent(langFilter);


  let { isLoading, data: repos } = useFetch<Repo[]>({
    url: `/api/project?lang=${langFilter}&sort_by=${sortFilter.value}&order=${sortFilter.order}&min_stars=${starsRange.min_stars}&max_stars=${starsRange.max_stars}`,
  });

  console.log("repo", repos)




  return (
    <>
      <ListLoader isLoading={isLoading} />
      {Array.isArray(repos) && repos.length > 0 ? (
        repos?.map((repo) => (
          <Accordion key={repo.name} type="single" collapsible className="my-2">
            <AccordionItem
              value="item-1"
              className="border border-slate-500 dark:border-slate-700 px-4 rounded-sm"
            >
              <AccordionTrigger>
                <div className="text-left relative w-full">
                  <div className="flex justify-between">
                    <Link target="_blank" href={repo.html_url}>
                      <h1 className="inline text-md text-slate-800 dark:text-slate-300 font-semibold hover:underline py-2">
                        <span className="capitalize">{repo.owner}</span> /{" "}
                        <span className="capitalize">{repo.name}</span>
                      </h1>
                    </Link>
                    <Badge variant="outline">{repo.issues.length} issues</Badge>
                  </div>
                  <h6 className="text-md text-slate-800 dark:text-slate-400 line-clamp-2">
                    {repo.description}
                  </h6>
                  <div className="flex text-sm gap-x-4 py-2 font-light text-slate-800 dark:text-slate-400">
                    <div>Stars: {repo.stars}</div>
                    <div>Lang: {repo.language}</div>
                    <div>
                      Last active: {dayjs(repo.last_modified)?.from(dayjs())}
                    </div>
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
                      <Link target="_blank" href={issue.html_url}>
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
        ))
      ) : (
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-2xl uppercase font-semibold mb-2 mt-0 text-slate-700 dark:text-slate-300">No Repositary Found</h1>
        </div>
      )}


    </>
  );
};

export default List;
