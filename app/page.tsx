import { unstable_cache } from "next/cache";

import { getGames } from "@/lib/rawg";
import Content from "@/components/widgets/page/content";

const getGamesCache = unstable_cache(
  async () => { 
    const gamesResult = await getGames()
    return await gamesResult?.json()
  },
  ['games-data-1']
)

export default async function Home() {
  const [games] = await Promise.all([await getGamesCache()])

  return (
    <div>
      <Content games={games} mode="normal" />
    </div>
  );
}
