'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from 'react';

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Game } from "@/lib/schema"
import Platform from "@/components/widgets/page/parts/platform"
import Genre from "@/components/widgets/page/parts/genre"
import Tags from "@/components/widgets/page/parts/tags"

export default function Item({ item, mode = "normal" }: { item: Game, mode?: "normal" | "highlight-rating" | "dlc" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (item.short_screenshots ? item.short_screenshots.length : 1));
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, item.short_screenshots]);

  const card = (
    <Card
      onMouseEnter={() => setIsHovered(true && (!!item?.short_screenshots && item.short_screenshots.length > 0))}
      onMouseLeave={() => setIsHovered(false)}
      className="group lg:h-[553px] transition-transform duration-200 ease-in-out hover:scale-105 w-full max-w-sm shadow-lg rounded-2xl overflow-hidden pt-0 lg:my-2"
    >
      <CardHeader className="p-0 gap-4">
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          {(!isHovered && <Image
            src={(item.background_image ?? "https://placehold.co/600x400")}
            alt={item.name}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />)}
          {isHovered && item.short_screenshots && item.short_screenshots.length > 0 && (
            item.short_screenshots.map((ss, i) => (
            <Image
              key={i}
              src={ss.image}
              alt={`Slide ${i}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'top',
              }}
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))
        )}
        </div>
        <div className="grid px-6 gap-2">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          <p>Released: {new Date(item.released).toLocaleDateString()}</p>
          <Platform platformList={item.platforms} />
          <Genre genre={item.genres} />
          <Tags tags={item.tags} />
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