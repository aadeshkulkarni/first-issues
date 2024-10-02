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
          {/* <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 424 511.51" height={300} width={300} className="p-1 rounded-xl dark:bg-emerald-100"><path fill-rule="nonzero" d="M174.43 443.27H21.31C9.54 443.27 0 433.73 0 421.97V21.3C0 9.51 9.52 0 21.31 0h200.94c3.64 0 6.97 1.66 9.15 4.36l104.84 102.09c5.64 5.64 8.62 10.07 8.62 11.43l-.02 135.35c-7.59-3.2-15.53-5.72-23.76-7.49l-.01-113.62h-98.82c-6.64 0-11.94-5.41-11.94-11.95V23.69H23.8v395.78h140.26c2.7 8.32 6.18 16.28 10.37 23.8zm118.07-169.1c28.59 0 54.48 11.59 73.22 30.33 18.75 18.74 30.33 44.63 30.33 73.23 0 20.92-6.2 40.39-16.87 56.68L424 483.26l-30.9 28.25-43.23-47.56c-16.42 10.95-36.15 17.34-57.37 17.34-28.6 0-54.49-11.6-73.22-30.34-18.75-18.74-30.34-44.63-30.34-73.22 0-28.6 11.59-54.49 30.33-73.23 18.74-18.74 44.63-30.33 73.23-30.33zm59.62 43.93c-15.25-15.26-36.33-24.7-59.62-24.7s-44.37 9.44-59.62 24.7c-15.26 15.26-24.7 36.34-24.7 59.63 0 23.28 9.44 44.37 24.7 59.62 15.25 15.26 36.33 24.69 59.62 24.69s44.37-9.43 59.62-24.69c15.26-15.26 24.7-36.34 24.7-59.62 0-23.29-9.44-44.37-24.7-59.63zm-36.35 21.39 14.49 14.57-23.37 23.67 23.39 23.69-14.53 14.49-23.25-23.54-23.27 23.58-14.49-14.57 23.36-23.67-23.38-23.69 14.53-14.49 23.24 23.54 23.28-23.58z"/></svg>
          <h1 className="text-2xl uppercase font-semibold mb-2 mt-0 text-slate-700 dark:text-slate-300">No Repositary Found</h1> */}
        </div>
      )}


    </>
  );
};

export default List;
