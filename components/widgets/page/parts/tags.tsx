'use client'
import { UsualType } from "@/lib/schema";
import { Badge } from "@/components/ui/badge"

export default function Tags({ tags, className }: { tags: UsualType[], className?: string }) {
  if (tags.filter(val => /^[a-zA-Z]+$/.test(val.name)).length <= 0) {
    return (<></>)
  }

  return (
    <div className={`${className ?? ""} flex flex-wrap gap-1 my-3`}>
      <h2 className="w-full">Tags: </h2>
      {tags.filter(val => /^[a-zA-Z]+$/.test(val.name)).slice(0,5).map((item, index) =>
        <Badge key={index} className="capitalize" variant="secondary">{item.name}</Badge>
      )}
    </div>
  )
}