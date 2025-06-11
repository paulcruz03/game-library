import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  getGameDetailBySlug,
  getGameDLCsBySlug,
  getGameScreenShotsBySlug,
  getGameSeriesBySlug,
  getGameStoresBySlug
} from "@/lib/rawg";
import Detail from "@/components/widgets/page/detail";
import { session } from "@/lib/auth";
import { getUserLibraryGameById } from "@/lib/server_db";

const getGameDetail = cache(async (slug: string) => {
  const res = await getGameDetailBySlug(slug)
  return await res?.json()
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const rawParams = await params;
  const gameDetail = await getGameDetail(rawParams.slug)
  return {
    title: `${gameDetail.name} - Game Library`,
    description: gameDetail.description_raw,
  }
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const rawParams = await params;
  const { data: userSession } = await session()

  const getGameDetailCache = unstable_cache(
    async (slug: string) => { 
      const [
        gameDetailRes,
        gameScreenShotsRes,
        gameStores,
        gameSeries,
        gameDlcs
      ] = await Promise.all([
        await getGameDetailBySlug(slug),
        await getGameScreenShotsBySlug(slug),
        await getGameStoresBySlug(slug),
        await getGameSeriesBySlug(slug),
        await getGameDLCsBySlug(slug)
      ])
      return await Promise.all([
        gameDetailRes?.status,
        await gameDetailRes?.json(),
        await gameScreenShotsRes?.json(),
        await gameStores?.json(),
        await gameSeries?.json(),
        await gameDlcs?.json()
      ])
    },
    [`game-detail-${rawParams.slug}`]
  )
  
  const [
    gameDetailsResStatus,
    gameDetails,
    gameScreenShots,
    gameStores,
    gameSeries,
    gameDlcs
  ] = await getGameDetailCache(rawParams.slug)
  if (gameDetailsResStatus === 404) {
    return notFound()
  }

  const userGameLibraryById = userSession.user 
    ? await getUserLibraryGameById(gameDetails.id)
    : null
  return (
    <div className="container max-w-4xl px-2 mx-auto my-10">
      <Detail
        isUserSaved={userGameLibraryById ? Boolean(userGameLibraryById.data?.length) : false}
        session={userSession.user}
        gameDetail={gameDetails}
        screenshots={gameScreenShots.results}
        stores={gameStores.results}
        series={gameSeries.results.splice(0,4)} // show only 4 game
        dlcs={gameDlcs.results.splice(0,4)} // show only 4 game
      />
    </div>
  )
}