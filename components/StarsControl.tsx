"use client"

import React from "react"
import { Slider } from "./ui/slider"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

interface StarControlProps {
  setStarsRange: React.Dispatch<React.SetStateAction<{
    max_stars: number;
    min_stars: number;
  }>>;
}
export function StarControl({ setStarsRange }: StarControlProps) {
  const [localValues, setLocalValues] = React.useState([10, 10000])

  function handleValueChange(newValues: number[]) {
    console.log("value changed", newValues);
    setLocalValues(newValues)
    setStarsRange({
      min_stars: newValues[0],
      max_stars: newValues[1]
    });

  }


  return (
    <div className="border border-emerald-600 shadow-xl p-4 grid gap-4 w-full max-w-80 bg-transparent bg-gray-200 pt-0 rounded-[12px] mt-2 dark:bg-inherit">
      <h2 className="uppercase font-semibold text-md py-4 text-slate-700 dark:text-slate-300">
        SELECT BY STAR COUNT
      </h2>
      <Slider
        defaultValue={[10, 10000]}
        max={10000}
        min={0}
        step={100}
        onValueChange={handleValueChange}
        className={cn("w-full")}
      />
      <div className="flex flex-wrap gap-2 ">
        <ol className="flex items-center w-full gap-3 ">
          {localValues.map((_, index) => (
            <Badge key={index} className="flex font-bold text-slate-700 items-center justify-between w-full border px-3 h-10 rounded-md dark:text-white !border-1 !border-gray-800 dark:!border-gray-500 !bg-inherit
             ">
              <span>{index === 0 ? "MIN" : "MAX"}</span>
              <span>{localValues[index]}</span>
            </Badge>
          ))}
        </ol>
      </div>
    </div>
  )
}