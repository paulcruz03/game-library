import Image from "next/image"
import Link from "next/link"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Game } from "@/lib/schema"
import { Badge } from "@/components/ui/badge"

export default function Item({ item, mode = "normal" }: { item: Game, mode?: "normal" | "highlight-rating" | "dlc" }) {
  const card = (
    <Card className="group h-[420px] lg:h-[375px] transition-transform duration-200 ease-in-out hover:scale-105 w-full max-w-sm shadow-lg rounded-2xl overflow-hidden pt-0 lg:my-2">
      <CardHeader className="p-0 gap-4">
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <Image
            src={item.background_image ?? "https://placehold.co/600x400"}
            alt={item.name}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </div>
        <div className="grid px-6 gap-2">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          <p>Released: {new Date(item.released).toLocaleDateString()}</p>
          {mode === 'highlight-rating' && <>
            <Badge variant={"destructive"}>Metacritic Rating: {item.metacritic}</Badge>
          </>}
          {item.rating > 0 && <Badge variant={"secondary"}>Rating {item.rating}</Badge>}
        </div>
      </CardHeader>
    </Card>
  )
  
  if (mode === 'dlc') {
    return card
  }

  return (
    <Link className="w-full" href={`/game/${item.slug}`}>
      {card}
    </Link>
  )
}