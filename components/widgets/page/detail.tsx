'use client'
import Link from "next/link"
import Image from "next/image"
import { User } from "@supabase/supabase-js"
import { toast } from "sonner"
import { useEffect, useState } from "react"
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import Platform from "@/components/widgets/page/parts/platform"
import Genre from "@/components/widgets/page/parts/genre"
import Tags from "@/components/widgets/page/parts/tags"
import { Game, GameDetail, Screenshot, Store, Trailer } from "@/lib/schema";
import { addToLibrary, removeFromTheLibrary } from "@/lib/db"
import Item from "./itemCard"
import { getGameSuggestionBaseOnTagsOrGenres } from "@/lib/rawg"

interface Props {
  gameDetail: GameDetail;
  screenshots: Screenshot[];
  session: User | null;
  isUserSaved: boolean;
  stores: Store[];
  series: Game[];
  dlcs: Game[];
}

export default function Detail(
  { gameDetail, screenshots, session, isUserSaved, stores, series, dlcs }: Props) {
  const [isAddedToLibrary, setIsAddedToLibrary] = useState<boolean>(isUserSaved)
  const [suggestions, setSuggestions] = useState<Game[]>([])

  useEffect(() => {
    getGameSuggestionBaseOnTagsOrGenres(
      "1",
      gameDetail.tags.map(item => item.slug).join(","),
      gameDetail.genres.map(item => item.slug).join(",")
    ).then(async (res) => {
      const { results } = await res?.json()
      setSuggestions(results)
    })
  }, [gameDetail])
  
  const handleAddToLibrary = async (gameId: number) => {
    if (session) {
      const { error } = await addToLibrary(session, gameId)
      if (!error) {
        toast("Added to the library");
        setIsAddedToLibrary(true);
        return;
      }
      toast(error.message);
    }
  }

  const handleRemoveFromLibrary = async (gameId: number) => {
    if (session) {
      const { error } = await removeFromTheLibrary(session, gameId)
      if (!error) {
        toast("Remove from the library");
        setIsAddedToLibrary(false);
        return;
      }
      toast(error.message);
    }
  }

  return (
    <div className="grid">
      <Breadcrumb className="order-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{gameDetail.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* details */}
      <div className="order-2 mt-3 max-w-4xl flex flex-col items-center gap-2">
        <div className="grid grid-cols-2 justify-between w-full">
          <div>
            <h2 className="capitalize text-3xl">{gameDetail.name}</h2>
            <Platform platformList={gameDetail.platforms} />
            <Genre genre={gameDetail.genres} />
            <Tags tags={gameDetail.tags} />
          </div>
          {session && <div className="flex items-center justify-end">
            {!isAddedToLibrary && <Button onClick={() => handleAddToLibrary(gameDetail.id)}>Add to Library</Button>}
            {isAddedToLibrary && <Button onClick={() => handleRemoveFromLibrary(gameDetail.id)}>Remove from Library</Button>}
          </div>}
        </div>
      </div>

      {/* banner */}
      <div className="grid lg:grid-cols-8 gap-3 mt-3 order-3">
        <div className="lg:col-span-3 col-span-5">
          <div className="transition-transform duration-200 ease-in-out hover:scale-105 relative w-full h-[200px] lg:h-full">
            {gameDetail.background_image && <Image
              src={gameDetail.background_image}
              alt={gameDetail.name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />}
          </div>
        </div>
        <div className="grid col-span-5 grid-cols-2 md:grid-cols-3 gap-3">
          {screenshots.slice(0,6).map((item, index) => <div key={index}>
            <div className="transition-transform duration-200 ease-in-out hover:scale-105 relative w-full h-[200px]">
              <Image
                src={item.image}
                alt={gameDetail.name}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          </div>)}
        </div>
      </div>

      <div className="mt-3 max-w-4xl flex flex-col items-center gap-2 order-4">
        <p className="max-w-4xl">{gameDetail.description_raw}</p>
      </div>

      {stores.length > 0 &&<div className="mt-3 order-5">
        <h2 className="capitalize text-xl">Buy at:</h2>
        <ul className="grid gap-3 mt-3">
          {stores.map((item, index) => <li key={index}>
            <Link className="underline" href={item.url}>{item.url}</Link>
          </li>)}
        </ul>
      </div>}

      <div className="mt-3 order-6">
        {(series.length > 0) && <div>
          <h2 className="capitalize text-xl mb-4">Series</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 justify-items-center">
            {series.map(item => <Item key={item.slug} item={item} />)}
          </div>
        </div>}

        {(dlcs.length > 0) && <div>
          <h2 className="capitalize text-xl my-4">DLC</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 justify-items-center">
            {dlcs.map(item => <Item key={item.slug} item={item} mode="dlc" />)}
          </div>
        </div>}

        {(suggestions.length > 0) && <div>
          <h2 className="text-xl my-4">Suggestions base on game tags and genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 justify-items-center">
            {suggestions
              .filter(item => item.slug != gameDetail.slug) // remove possibly the same game of the game detail
              .splice(0,4)
              .map(item => <Item key={item.slug} item={item} />)}
          </div>
        </div>}
      </div>

    </div>
  )
}