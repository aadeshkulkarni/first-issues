"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GITHUB_CONTRIBUTOR_URL } from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/SkeletonContributor";

interface ContributorProp {
  id: string;
  html_url: string;
  bio?: string;
  avatar_url: string;
  login: string;
  contributions: string;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<ContributorProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GITHUB_CONTRIBUTOR_URL);
        const contributorDetails = await Promise.all(
          response.data.map(async (contributor: any) => {
            const details = await axios.get(contributor.url);
            return { ...contributor, bio: details.data.bio };
          })
        );
        setContributors(contributorDetails);
        setLoading(false);
        // setContributors(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Error in fetching Contributors", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl uppercase font-semibold mb-2 mt-0 text-slate-700 dark:text-slate-300">
          Contributors
        </h1>
        <p className="mb-8 text-sm">
          If you would like to contribute to the project do visit{" "}
          <Link className="px-2 py-1 bg-green-600 text-white rounded-full text-xs" href="https://github.com/aadeshkulkarni/first-issues">

              Github
            </Link>
          {" "}
        </p>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <ContributorsList contributors={contributors} />
        )}
      </div>
    </>
  );
};

const ContributorsList = ({
  contributors,
}: {
  contributors: ContributorProp[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.id} contributor={contributor} />
      ))}
    </div>
  );
};

const ContributorCard = ({ contributor }: { contributor: ContributorProp }) => {
  return (
    <Card
      className="w-[242px] mx-auto bg-transparent transform transition-transform duration-300 hover:scale-105"
      key={contributor?.id}
    >
      <CardHeader>
        <Link
          className="flex flex-col items-center space-y-2"
          href={contributor?.html_url}
        >
          <Image
            src={contributor.avatar_url}
            alt={contributor.login}
            width={100}
            height={100}
            className="rounded-full border-2 border-green-400 "
          />
          <h1 className="uppercase font-medium text-md pt-4 text-slate-700 dark:text-slate-300">
            {contributor.login}
          </h1>
          <p className="font-light">{contributor.bio || "Developer"}</p>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm text-muted-foreground">
          Contributions: {contributor.contributions}
        </div>
      </CardContent>
    </Card>
  );
};

export default Contributors;
