import { repoStore } from "@/store/repo-store";

export const GET = async () => {
  try {
    const repoDetails = repoStore.read();
    const countObj: Record<string, number> = {};

    Object.keys(repoDetails.details).forEach((lang) => {
      countObj[lang] = repoDetails.details[lang].length;
    });

    return new Response(JSON.stringify(countObj), { status: 200 });
  } catch (error) {
    return new Response("Failed to read repo details", {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
