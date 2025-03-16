import { useQuery } from "@tanstack/react-query";
import { Movie } from "types/movie";

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "John Wick: Chapter 3 - Parabellum",
    rating: "8.1/10",
    times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
    genre: "Action, Thriller",
    duration: "2h 10m",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s",
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    rating: "8.4/10",
    times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
    genre: "Action, Adventure",
    duration: "3h 1m",
    image: "https://example.com/avengers.jpg",
  },
];

const fetchMovies = async (): Promise<{ movies: Movie[]; featuredMovies: Movie[] }> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ movies: mockMovies, featuredMovies: [mockMovies[0]] }), 1000)
  );
};

export const useMoviesQuery = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};
