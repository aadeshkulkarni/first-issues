"use client";

import React from "react";
import List from "@/components/List";
import Info from "@/components/Info";
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const New_PROJECT =
  "https://github.com/aadeshkulkarni/first-issues?tab=readme-ov-file#adding-a-new-project";

const Home = () => {
  const [langFilter, setLangFilter] = React.useState<string>("");

  return (
    <main className="flex min-h-screen flex-col justify-between md:overflow-hidden">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 px-4 sticky overflow-hidden">
          <Info />
          <Filter langFilter={langFilter} setLangFilter={setLangFilter} />
          <Button
            variant="default"
            className="w-full uppercase text-sm"
            onClick={() => window.location.replace(New_PROJECT)}
          >
            <Plus className="w-5 h-5 mr-2" /> Add your project
          </Button>
        </div>
        <div className="col-span-12 md:col-span-8 h-[90vh] overflow-y-auto">
          <List langFilter={langFilter} />
        </div>
      </div>
    </main>
  );
};

export default Home;

const Loader = () => {};
