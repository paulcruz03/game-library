'use client';

import { useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";

import { Game } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGames } from "@/lib/rawg";
import { debounce } from "@/utils/fxn"
import Item from "./itemCard";

interface Props {
  games: { results: Game[], count: number };
  mode: 'normal' | 'genre' | 'tags'
  slug?: string
}

export default function Content({ games, mode, slug }: Props) {
  const [totalCount, setTotalCount] = useState<number>(games.count)
  const [gameList, setGameList] = useState<Game[]>(games.results)
  const [gamePage, setGamePage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [searching, setSearching] = useState<boolean>(false)
  const searchInput = useRef<HTMLInputElement>(null)

  const loadMore = async () => {
    setLoading(true)
    const targetPage = gamePage + 1
    const gamesResult = await getGames(
      `${targetPage}`,
      searchInput.current?.value ?? undefined,
      mode === 'tags' && slug ? slug : undefined,
      mode === 'genre' && slug ? slug : undefined
    )
    const newGames = await gamesResult?.json()

    setGamePage(targetPage)
    setGameList([ ...gameList, ...newGames.results ])
    setLoading(false)
  }
  
  const search = async () => {
    if (!searchInput.current?.value) {
      setGamePage(1)
      setGameList([ ...games.results ])
      setTotalCount(games.count)
      return
    }

    setLoading(true)
    setSearching(true)

    const targetPage = 1
    const gamesResult = await getGames(
      `${targetPage}`,
      searchInput.current.value,
      mode === 'tags' && slug ? slug : undefined,
      mode === 'genre' && slug ? slug : undefined
    )
    const newGames = await gamesResult?.json()

    setTotalCount(newGames.count)
    setGamePage(targetPage)
    setGameList([ ...newGames.results ])
    setLoading(false)
    setSearching(false)
  }

  return (
    <div className="w-full relative">
      <div className="lg:grid lg:grid-cols-2 p-2 items-center justify-between">
        <h2 className="text-center lg:text-left text-3xl w-full my-5 capitalize">{mode === 'normal' ? 'Game Library' : slug?.replaceAll("-", " ")}</h2>
        <div className="flex w-full lg:max-w-sm items-center space-x-2 justify-self-end">
          <div className="relative w-full">
            <Input
              ref={searchInput}
              onChange={debounce(search)}
              disabled={searching}
              className="h-13 w-full pl-12"
              placeholder="Search" 
            />
            {
              !searching 
                ? <Search className="absolute top-0 m-3.5" />
                : <Loader2 className="absolute top-0 m-3.5 animate-spin" />
            }
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 px-2 justify-items-center">
        {gameList.map(item => <Item key={item.slug} item={item} />)}
      </div>

      {totalCount > gameList.length && <Button disabled={loading} className="w-full my-5 h-16" onClick={loadMore}>
        {loading ? <span className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Please wait
        </span> : <span>Load More</span>}
      </Button>}
    </div>
  )
}