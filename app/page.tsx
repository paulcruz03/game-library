import { unstable_cache } from "next/cache";

import { getGames, getHighlyRatedGames } from "@/lib/rawg";
import Content from "@/components/widgets/page/content";
import Banner from "@/components/widgets/page/banner";

const getGamesCache = unstable_cache(
  async () => { 
    const gamesResult = await getGames()
    return await gamesResult?.json()
  },
  ['games-data-1']
)

const getHighlyRatedGamesCache = unstable_cache(
  async () => { 
    const highlyRatedGameResults = await getHighlyRatedGames()
    return await highlyRatedGameResults?.json()
  },
  ['highly-rated-games-1']
)

export default async function Home() {
  const [games, highlyRatedGames] = await Promise.all([await getGamesCache(), await getHighlyRatedGamesCache()])

  return (
    <div className="container max-w-4xl px-2 mx-auto my-10">
      <Banner games={highlyRatedGames} />
      <Content games={games} mode="normal" />
    </div>
  );
}
