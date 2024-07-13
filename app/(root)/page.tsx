"use client";

import React from "react";
import List from "@/components/List";
import Info from "@/components/Info";
import Filter from "@/components/Filter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { sortProp } from "@/utils/constants";

const New_PROJECT =
  "https://github.com/aadeshkulkarni/first-issues?tab=readme-ov-file#adding-a-new-project";

const Home = () => {
  const [langFilter, setLangFilter] = React.useState<string>("");
  const [sortFilter, setSortFilter] = React.useState<sortProp>({});
  const router = useRouter();

  const navigateToFeedback = () => {
    router.push("/feedback");
  }

  const navigateToContributors = () => {
    router.push("/contributors");
  };

  return (
    <main className="flex min-h-screen flex-col justify-between md:overflow-hidden">
      <div className="grid grid-cols-12 gap-4 overflow-y-auto md:overflow-hidden no-scrollbar">
        <div className="col-span-12 md:col-span-4 px-4 md:sticky md:overflow-hidden">
          <Info />
          <Filter
            langFilter={langFilter}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
            setLangFilter={setLangFilter}
          />
          <Button
            variant="default"
            className="w-full uppercase text-sm"
            onClick={() => window.location.replace(New_PROJECT)}
          >
            <Plus className="w-5 h-5 mr-2" /> Add your project
          </Button>
          <Button
            variant="link"
            className="w-full uppercase text-xs mt-6"
            onClick={navigateToFeedback}
          >
            Send Feedback
          </Button>
          <Button variant='link' className="w-full uppercase text-xs" onClick={navigateToContributors}>
            Contributors
          </Button>
        </div>
        <div className="col-span-12 md:col-span-8 md:h-[90vh] overflow-y-auto no-scrollbar">
          <List langFilter={langFilter} sortFilter={sortFilter} />
        </div>
      </div>
    </main>
  );
};

export default Home;
