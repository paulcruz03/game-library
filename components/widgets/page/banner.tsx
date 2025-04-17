import { Game } from "@/lib/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Item from "./itemCard";

export default function Banner({ games }: { games: { results: Game[], count: number } }) {
  return (
    <div>
      <h2 className="text-3xl mt-5 mb-2 lg:mb-0">Highly Rated Games of All Time</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {games.results.map((item, index) => (
            <CarouselItem key={index} className="sm:basis-1 md:basis-1/2 lg:basis-1/4">
              <Item mode="highlight-rating" item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  )
}