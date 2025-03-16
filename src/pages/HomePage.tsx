import DatePickerSlider from '@components/DatePicker';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import ShowTimeButton from '@components/ShowTimeButton';
import { ChevronRight, Clock, Film, Info, Play, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Movie } from 'types/movie';
const HomePage = () => {
  const [activeTab, setActiveTab] = useState('now-showing');

  const featuredMovies = [
    {
      id: 1,
      title: 'John Wick: Chapter 3 - Parabellum',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s',
      showtimes: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      rating: '8.1/10',
      year: '2019',
      genre: 'Action/Thriller',
      duration: '2h 10 min'
    },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const movies = [
    {
      id: 1,
      title: "John Wick: Chapter 3 - Parabellum",
      rating: "8.1/10",
      times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      genre: "Action, Thriller",
      duration: "2h 10m"
    },
    {
      id: 2,
      title: "Avengers: Endgame",
      rating: "8.4/10",
      times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      genre: "Action, Adventure",
      duration: "3h 1m"
    },
    {
      id: 3,
      title: "Joker",
      rating: "8.4/10",
      times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      genre: "Crime, Drama",
      duration: "2h 2m"
    },
    {
      id: 4,
      title: "Spider-Man: Far From Home",
      rating: "7.5/10",
      times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      genre: "Action, Adventure",
      duration: "2h 9m"
    },
    {
      id: 5,
      title: "The Lion King",
      rating: "6.9/10",
      times: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      genre: "Animation, Adventure",
      duration: "1h 58m"
    }
  ];

  // Time slot selection
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Check if showtime has passed
  const isShowtimePassed = (timeStr) => {
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate !== today) return false;

    const [timePart, ampm] = timeStr.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    // const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    let showHours = hours;
    if (ampm === 'PM' && hours < 12) showHours += 12;
    if (ampm === 'AM' && hours === 12) showHours = 0;

    const showtime = new Date();
    showtime.setHours(showHours, minutes, 0);

    return currentTime > showtime;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      {featuredMovies.map((movies) => (
        <FeaturedMovie movie={movies} />
      ))}
      {/* Movies Section */}
      <section className="bg-primary-950 px-6 py-8">
        <div className="flex border-b border-primary-800 mb-6">
          <button
            className={`flex items-center pb-4 px-6 font-medium ${activeTab === 'now-showing'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-primary-600'
              }`}
            onClick={() => setActiveTab('now-showing')}
          >
            <Film className="w-5 h-5 mr-2 text-blue-400" />
            Đang chiếu
          </button>
          <button
            className={`flex items-center pb-4 px-6 font-medium ${activeTab === 'coming-soon'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-primary-600'
              }`}
            onClick={() => setActiveTab('coming-soon')}
          >
            <Clock className="w-5 h-5 mr-2 text-blue-400" />
            Sắp chiếu
          </button>
        </div>


        <div className="mt-6 text-center">
          <div className="mb-6">

            {/* Date selector with animation */}
            <DatePickerSlider range={5} selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>

          {/* Movies list in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                selectedTime={selectedMovieId === movie.id ? selectedTime : null}
                isShowtimePassed={isShowtimePassed}
                onSelectTime={(movieId, time) => {
                  setSelectedMovieId(movieId);
                  setSelectedTime(time);
                }}
                isSelected={selectedMovieId === movie.id}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Cinema Selection */}
      <section className="px-6 py-8 bg-primary-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Rạp phim phổ biến</h2>
          <button className="text-primary-400 flex items-center space-x-1">
            <span>Xem tất cả</span>
            <ChevronRight className="text-primary-400" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-primary-800 rounded-lg p-4 hover:bg-primary-700 transition-colors duration-300 shadow-md">
              <h3 className="font-bold mb-2 text-white">Regal City {i}</h3>
              <p className="text-primary-300 text-sm mb-4">123 Cinema Street, Downtown</p>
              <div className="flex space-x-2">

                {/* Các nút khác tương tự */}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;





interface FeaturedMovieProps {
  movie: {
    id: number;
    title: string;
    image: string;
    rating: string;
  };
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  return (
    <section className="relative h-96">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-950">
        {/* Background overlay có thể thay đổi theo nhu cầu */}
        <img
          src="data:image/jpeg;base64,..."
          alt="Featured Movie"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="absolute bottom-0 left-0 p-8 flex items-end">
        <div className="w-48">
          <img src={movie.image} alt={movie.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="ml-8 mb-6">
          <h1 className="text-4xl font-bold mb-2 text-white">{movie.title}</h1>
          <div className="flex items-center space-x-2 mb-4 text-white">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex space-x-4">
            <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-md flex items-center space-x-2 text-white transition-colors duration-300">
              <span>Đặt vé</span>
            </button>
            <button className="bg-primary-700 hover:bg-primary-800 px-6 py-2 rounded-md flex items-center space-x-2 text-white transition-colors duration-300">
              <Play size={16} />
              <span>Xem trailer</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


interface MovieCardProps {
  movie: Movie;
  selectedTime: string | null;
  isShowtimePassed: (time: string) => boolean;
  onSelectTime: (movieId: number, time: string) => void;
  isSelected: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, selectedTime, isShowtimePassed, onSelectTime, isSelected }) => {
  return (
    <div
      className={`bg-primary-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-primary-700 h-full ${isSelected ? 'ring-2 ring-primary-400 shadow-lg' : ''
        }`}
    >
      <div className="flex h-full">
        {/* Poster */}
        <div
          className="w-1/3 h-auto relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent"></div>
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            <span>{movie.rating}</span>
          </div>
        </div>
        {/* Details & showtimes */}
        <div className="p-3 w-2/3 flex flex-col">
          <div className="mb-2">
            <h3 className="font-bold text-sm md:text-base line-clamp-1 text-white">{movie.title}</h3>
            <div className="flex items-center text-primary-300 text-xs mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span className="mr-2">{movie.duration}</span>
              <Info className="w-3 h-3 mr-1" />
              <span className="truncate">{movie.genre}</span>
            </div>
          </div>
          <div className="flex-grow">
            <h4 className="text-xs font-medium mb-2 text-primary-300 text-left">Chọn giờ chiếu:</h4>
            <div className="flex flex-wrap gap-2">
              {movie.times.map((time, idx) => {
                const passed = isShowtimePassed(time);
                const selected = isSelected && selectedTime === time;
                return (
                  <ShowTimeButton
                    key={idx}
                    time={time}
                    isDisabled={passed}
                    isSelected={selected}
                    onClick={() => onSelectTime(movie.id, time)}
                  />
                );
              })}
            </div>
          </div>
          <div
            className={`mt-3 transition-all duration-300 ease-in-out ${isSelected && selectedTime ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
              }`}
          >
            <button className="w-full bg-primary-500 hover:bg-primary-400 px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 transform hover:shadow-lg text-white">
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};