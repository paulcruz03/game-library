import { notFound } from "next/navigation";
import Link from "next/link";

import ItemCard from "@/components/widgets/page/itemCard";
import { session } from "@/lib/auth";
import { getGameDetailsById } from "@/lib/rawg";
import { GameDetail } from "@/lib/schema";
import { serverGetUserLibary } from "@/lib/server_db";

export default async function Page() {
  const { data: userSession } = await session();
  if (!userSession.user) {
    return notFound();
  }

  const rawUserLibrary = await serverGetUserLibary();
  if (rawUserLibrary.status !== 200 || (!rawUserLibrary.data)) {
    return notFound();
  }

  const getGameDetail = async (
    item: { created_at: string, game_id: number, user_id: string }
  ): Promise<GameDetail> => {
    const gameDetail = await getGameDetailsById(item.game_id)
    return await gameDetail?.json()
  }
  const userLibrary = await Promise.all(
    rawUserLibrary.data.map(async (item) => await getGameDetail(item))
  )

  return (
    <div className="container max-w-4xl px-2 mx-auto my-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl my-5">My Library</h2>
      </div>

      {(userLibrary.length === 0) && <>No games added. <Link className="underline" href="/">Browse Here</Link></>}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {userLibrary.map((item) => <ItemCard key={item.slug} item={item} />)}
      </div>
    </div>
  )
}