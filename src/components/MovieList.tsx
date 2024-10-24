import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MovieCard } from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Ticket } from "lucide-react";

const mockMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "https://placehold.co/300x450",
    releaseDate: "2024-03-01",
    availableSeats: 45,
    price: 12.99,
  },
  {
    id: 2,
    title: "Ghostbusters: Frozen Empire",
    image: "https://placehold.co/300x450",
    releaseDate: "2024-03-22",
    availableSeats: 30,
    price: 14.99,
  },
];

export const MovieList = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return mockMovies;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value="upcoming" className="border rounded-lg bg-white/5 backdrop-blur-sm">
        <AccordionTrigger className="px-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <span>Upcoming Movies (March 2024)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="thisWeek" className="border rounded-lg bg-white/5 backdrop-blur-sm">
        <AccordionTrigger className="px-4">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            <span>This Week's Movies</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};