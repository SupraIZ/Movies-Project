import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice.js";

const AllMovies = () => {
  const dispatch = useDispatch();

  // Fetch all movies, genres, and categorized movies (new, top, random)
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  // Access movies filter and filtered movies from Redux state
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  // Extract unique years from the movies data
  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  // Initialize filtered movies and unique years in Redux state
  useEffect(() => {
    // console.log("Movies data:", data);
    // console.log("Movie years:", movieYears);
    // console.log("Unique years:", uniqueYears);

    if (data && Array.isArray(movieYears) && Array.isArray(uniqueYears)) {
      dispatch(setFilteredMovies(data || [])); // Set all movies as the initial filtered list
      dispatch(setMovieYears(movieYears)); // Store all movie years in Redux
      dispatch(setUniqueYears(uniqueYears)); // Store unique years in Redux
    }
  }, [data, dispatch]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value })); // Update search term in Redux

    // Filter movies based on the search term
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies)); // Update filtered movies in Redux
  };

  // Handle genre selection
  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId); // Filter movies by genre
    dispatch(setFilteredMovies(filterByGenre)); // Update filtered movies in Redux
  };

  // Handle year selection
  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year); // Filter movies by year
    dispatch(setFilteredMovies(filterByYear)); // Update filtered movies in Redux
  };

  // Handle sorting options
  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies)); // Show new movies
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies)); // Show top movies
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies)); // Show random movies
        break;
      default:
        dispatch(setFilteredMovies([])); // Clear filtered movies
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <>
        <section>
          {/* Banner Section */}
          <div
            className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

            {/* Banner text */}
            <div className="relative z-10 text-center text-white mt-[10rem]">
              <h1 className="text-8xl font-bold mb-4">The Cinema Hub</h1>
              <p className="text-2xl">
                Cinematic Odyssey: Unveiling the Magic of Cinemas
              </p>
            </div>
          </div>

          {/* Search and Filters Section */}
          <section className="w-screen flex flex-col items-center mb-5">
            {/* Search Input */}
            <input
              type="text"
              className="w-[50%] h-[5rem] border px-10 outline-none rounded"
              placeholder="Search Cinemas..."
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />

            {/* Filters: Genre, Year, Sort */}
            <section className="sorts-container mt-[2rem] flex justify-center gap-2">
              {/* Genre Filter */}
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedGenre || ""} // Ensure scalar value
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedYear || ""} // Ensure scalar value
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                className="border p-2 rounded text-black"
                value={moviesFilter.selectedSort || ""} // Ensure scalar value
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">New Cinemas</option>
                <option value="top">Top Cinemas</option>
                <option value="random">Random cinemas</option>
              </select>
            </section>
          </section>

          {/* Movies List Section */}
          <section className="mt-[3rem] w-screen flex justify-center items-center flex-wrap">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </section>
        </section>
      </>
    </div>
  );
};

export default AllMovies;
