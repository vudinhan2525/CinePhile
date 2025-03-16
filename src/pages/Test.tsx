import DatePickerSlider from '@components/DatePicker';
import { Calendar, Clock, Film, Info, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const ImprovedShowtimes = () => {
  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const formattedDate = {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date,
        isToday: i === 0
      };

      dates.push(formattedDate);
    }
    return dates;
  };

  const availableDates = generateDates();
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
  const [selectedMovie, setSelectedMovie] = useState(null);
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
    <div className="bg-gray-900 text-white p-4 md:p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Film className="w-5 h-5 mr-2 text-blue-400" />
            Now Showing
          </h2>
          <div className="flex items-center text-blue-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Date selector with animation */}
        <DatePickerSlider range={5} selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>

      {/* Movies list in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movies.map(movie => (
          <div
            key={movie.id}
            className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-750 h-full ${selectedMovie === movie.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
          >
            <div className="flex h-full">
              {/* Movie poster section */}
              <div className="w-1/3 h-auto bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              {/* Movie details and showtimes */}
              <div className="p-3 w-2/3 flex flex-col">
                <div className="mb-2">
                  <h3 className="font-bold text-sm md:text-base line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center text-gray-400 text-xs mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="mr-2">{movie.duration}</span>
                    <Info className="w-3 h-3 mr-1" />
                    <span className="truncate">{movie.genre}</span>
                  </div>
                </div>

                {/* Compact time selection */}
                <div className="flex-grow">
                  <h4 className="text-sm font-medium mb-3 text-gray-300">Select Showtime:</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.times.map((time, idx) => {
                      const isPassed = isShowtimePassed(time);
                      return (
                        <button
                          key={idx}
                          disabled={isPassed}
                          className={`px-3 py-1.5 rounded text-center text-sm transition-all duration-200 transform 
            ${isPassed
                              ? 'bg-gray-700 text-gray-500 line-through cursor-not-allowed opacity-60'
                              : selectedMovie === movie.id && selectedTime === time
                                ? 'bg-blue-600 text-white border border-blue-400 shadow-md'
                                : 'bg-gray-800 border border-gray-600 hover:border-blue-400 hover:text-blue-300 hover:shadow-md'
                            }`}
                          onClick={() => {
                            if (!isPassed) {
                              setSelectedMovie(movie.id);
                              setSelectedTime(time);
                            }
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking button with animation */}
                <div className={`mt-3 transition-all duration-300 ease-in-out ${selectedMovie === movie.id && selectedTime ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
                  }`}>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 transform hover:shadow-lg">
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprovedShowtimes;