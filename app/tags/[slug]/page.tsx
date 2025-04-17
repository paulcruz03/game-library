import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import Content from "@/components/widgets/page/content";
import { getGames } from "@/lib/rawg";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const getTagsGamesCache = unstable_cache(
    async () => { 
      const gamesResult = await getGames("1", undefined, slug, undefined)
      return await gamesResult?.json()
    },
    [slug],
    { tags: [`tag-games`] }
  )
  
  const tagsGames = await getTagsGamesCache()
  if (!tagsGames.results.length) {
    return notFound()
  }

  return (
    <div className="container max-w-4xl px-2 mx-auto my-10">
      <Content games={tagsGames} slug={slug} mode="tags" />
    </div>
  )
}