import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import Content from "@/components/widgets/page/content";
import { getGames } from "@/lib/rawg";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const getGenreGamesCache = unstable_cache(
    async () => {
      const data = await getGames("1", undefined, undefined, slug)
      return await data?.json()
    },
    [slug],
    { tags: [`genre-games`] }
  )

  const genreGames = await getGenreGamesCache()
  if (!genreGames.results.length) {
    return notFound()
  }

  return (
    <div className="container max-w-4xl px-2 mx-auto my-10">
      <Content games={genreGames} slug={slug} mode={'genre'} />
    </div>
  )
}