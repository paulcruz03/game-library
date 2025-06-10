import { Skeleton } from "@/components/ui/skeleton"
 
export default function Loading() {
  return (
    <section className="container max-w-4xl px-2 mx-auto my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 px-2 justify-items-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="animate-pulse h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}