'use client'
import { UsualType } from "@/lib/schema";
import { Badge } from "@/components/ui/badge"

export default function Genre({ genre, className }: { genre: UsualType[], className?: string }) {
  if (genre.length <= 0) {
    return (<></>)
  }

  return (
    <div className={`${className ?? ""} flex flex-wrap gap-1 my-3`}>
      <h2 className="w-full">Genre: </h2>
      {genre.slice(0,5).map((item, index) => <Badge key={index} className="capitalize" variant="secondary">{item.name}</Badge>)}
    </div>
  )
}