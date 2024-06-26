import React from "react";
import { Badge } from "./ui/badge";
import useFetch from "@/hooks/useFetchRepos";
import { LangStats } from "@/schema/languageStats";
import FilterLoader from "./FilterLoader";
import { cn } from "@/lib/utils";

interface Props {
  langFilter: string;
  setLangFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({ langFilter, setLangFilter }: Props) => {
  const { isLoading, data: langStats = {} } = useFetch<LangStats>({
    url: "/api/lang-stats",
  });

  return (
    <div className="py-2 md:py-4">
      <h2 className="uppercase font-semibold text-md py-4 text-slate-700 dark:text-slate-300">
        BROWSE BY LANGUAGE
      </h2>
      {isLoading ? (
        <FilterLoader isLoading={isLoading} />
      ) : (
        <div className="flex flex-wrap gap-2">
          {Object.keys(langStats)
            .filter(Boolean)
            .map((item) => (
              <Badge
                key={item}
                onClick={() =>
                  setLangFilter((prev) => (prev === item ? "" : item))
                }
                className={cn("!border-1 !border-gray-500 !bg-inherit", {
                  " !border-green-500 ": item === langFilter,
                })}
              >
                <p
                  className={cn({
                    "!text-green-500": item === langFilter,
                    "!text-gray-500": item !== langFilter,
                  })}
                >
                  {item} x {langStats[item]}
                </p>
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
