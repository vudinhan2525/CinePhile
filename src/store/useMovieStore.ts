import { Movie } from "types/movie";
import { create } from "zustand";

interface MovieState {
  featuredMovies: Movie[];
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  setFeaturedMovies: (movies: Movie[]) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  featuredMovies: [],
  movies: [],
  setMovies: (movies) => set({ movies }),
  setFeaturedMovies: (movies) => set({ featuredMovies: movies }),
}));
