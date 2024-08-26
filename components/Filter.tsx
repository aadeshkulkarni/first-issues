import React, { useState } from "react";
import { Badge } from "./ui/badge";
import useFetch from "@/hooks/useFetchRepos";
import { LangStats, Repo } from "@/schema";
import FilterLoader from "./FilterLoader";
import { cn } from "@/lib/utils";
import { sortOptions, sortProp } from "@/utils/constants";
import { Slider } from "./ui/slider";
import PreviousMap from "postcss/lib/previous-map";
import { StarControl } from "./StarsControl";
interface Props {
  langFilter: string;
  sortFilter: sortProp | undefined;
  setSortFilter: React.Dispatch<React.SetStateAction<sortProp>>;
  setLangFilter: React.Dispatch<React.SetStateAction<string>>;
  setStarsRange: React.Dispatch<React.SetStateAction<{
    max_stars: number;
    min_stars: number;
  }>>;
}

const Filter = ({ langFilter, sortFilter, setSortFilter, setLangFilter ,setStarsRange}: Props) => {


  const { isLoading, data: langStats = [] } = useFetch<LangStats[]>({
    url: "/api/language",
  });



  function handleSortBtnClick(item: sortProp) {
    setSortFilter((prev) => (prev?.value === item.value ? { label: "", value: "", order: "" } : item));
    console.log("/api/")
  }

 
  return (
    <div className="py-2 md:py-4">
      <h2 className="uppercase font-semibold text-md py-4 text-slate-700 dark:text-slate-300">
        BROWSE BY LANGUAGE
      </h2>
      {isLoading ? (
        <FilterLoader isLoading={isLoading} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {langStats.map((item: LangStats) => (
            <Badge
              key={item.language}
              onClick={() => setLangFilter((prev) => (prev === item.language ? "" : item.language))}
              className={cn("!border-1 !border-gray-800 dark:!border-gray-500 !bg-inherit", {
                " !border-emerald-700 dark:!border-emerald-500": item.language === langFilter,
              })}
            >
              <p
                className={cn({
                  "!text-emerald-700 dark:!text-emerald-500": item.language === langFilter,
                  "!text-gray-800 dark:!text-gray-200": item.language !== langFilter,
                })}
              >
                {item.language} x {item.count}
              </p>
            </Badge>
          ))}
        </div>
      )}

      <StarControl setStarsRange={setStarsRange}/>

      <h2 className="uppercase font-semibold text-md py-4 text-slate-700 dark:text-slate-300">
        SORT BY
      </h2>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((item) => (
          <Badge
            key={item.value}
            onClick={() => handleSortBtnClick(item)}
            className={cn("!border-1 !border-gray-800 dark:!border-gray-500 !bg-inherit", {
              "!border-emerald-700 dark:!border-emerald-500": item.value === sortFilter?.value,
            })}
          >
            <p
              className={cn({
                "!text-emerald-700 dark:!text-emerald-500": item.value === sortFilter?.value,
                "!text-gray-800 dark:!text-gray-200": item.value !== sortFilter?.value,
              })}
            >
              {item.label}
            </p>
          </Badge>
        ))}
      </div>
    
    </div>
  );
};

export default Filter;
