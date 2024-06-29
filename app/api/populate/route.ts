import { populate } from "@/scripts/populate";
import { readRepos } from "@/utils/helper";

export const GET = async () => {
  try {
    const repos = await readRepos();
    await populate(repos);

    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response(`Error - ${error}`, {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
