import DatePickerSlider from '@components/DatePicker';
import { ChevronRight, Clock, Film, Info, Play, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    {
      id: 2,
      title: 'Avengers: Endgame',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s',
      showtimes: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      rating: '8.4/10',
      year: '2019',
      genre: 'Action/Sci-Fi',
      duration: '3h 1 min'
    },
    {
      id: 3,
      title: 'Joker',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s',
      showtimes: ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"],
      rating: '8.4/10',
      year: '2019',
      genre: 'Crime/Drama',
      duration: '2h 2 min'
    }
  ];

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
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-primary-900">
        <div className="flex items-center space-x-2">
          <Film className="text-primary-300" size={24} />
          <span className="text-xl font-bold text-primary-300">Cinephile</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <button className="text-white hover:text-primary-400">Phim</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          <button className="text-white hover:text-primary-400">Sự kiện</button>
          {/* Các nút khác tương tự */}
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Search className="text-primary-200" size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-primary-100">Xin chào, Samuel</span>
            <div className="w-8 h-8 bg-primary-700 rounded-full"></div>
          </div>
        </div>
      </header>
      {/* Featured Movie */}
      <section className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-950">
          <img src="data:image/jpeg;base64,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" alt="Featured Movie" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 flex items-end">
          <div className="w-48">
            <img src={featuredMovies[0].image} alt={featuredMovies[0].title} className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="ml-8 mb-6">
            <h1 className="text-4xl font-bold mb-2 text-white">{featuredMovies[0].title}</h1>
            <div className="flex items-center space-x-2 mb-4 text-white">
              <Star className="text-yellow-400" size={16} fill="currentColor" />
              <span>{featuredMovies[0].rating}</span>
              {/* Các span khác tương tự */}
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
              <div
                key={movie.id}
                className={`bg-primary-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-primary-700 h-full ${selectedMovie === movie.id ? 'ring-2 ring-primary-400 shadow-lg' : ''
                  }`}
              >
                <div className="flex h-full">
                  {/* Movie poster section */}
                  <div className="w-1/3 h-auto relative overflow-hidden" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23XpyZp64QmW0II5H0mLVX4RgEZ3JZzfoYg&s')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      <span>{movie.rating}</span>
                    </div>
                  </div>

                  {/* Movie details and showtimes */}
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

                    {/* Compact time selection */}
                    <div className="flex-grow">
                      <h4 className="text-xs font-medium mb-2 text-primary-300 text-left">Chọn giờ chiếu:</h4>
                      <div className="flex flex-wrap gap-2">
                        {movie.times.map((time, idx) => {
                          const isPassed = isShowtimePassed(time);
                          return (
                            <button
                              key={idx}
                              disabled={isPassed}
                              className={`px-2 py-1 rounded text-center text-xs transition-all duration-200 transform ${isPassed
                                ? 'bg-primary-950 text-primary-600 line-through cursor-not-allowed opacity-60'
                                : selectedMovie === movie.id && selectedTime === time
                                  ? 'bg-primary-500 text-white border border-primary-400 shadow-md'
                                  : 'bg-primary-900 border border-primary-600 text-primary-200 hover:border-primary-400 hover:text-primary-100'
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
                    <div
                      className={`mt-3 transition-all duration-300 ease-in-out ${selectedMovie === movie.id && selectedTime ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
                        }`}
                    >
                      <button className="w-full bg-primary-500 hover:bg-primary-400 px-3 py-1.5 rounded text-xs font-medium transition-all duration-300 transform hover:shadow-lg text-white">
                        Book Tickets
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
      {/* Footer */}
      <footer className="px-6 py-8 bg-primary-950 border-t border-primary-900">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="text-primary-300" size={24} />
              <span className="text-xl font-bold text-primary-300">Cinephile</span>
            </div>
            <p className="text-primary-300 text-sm max-w-md">
              Đặt vé xem phim cho bộ phim yêu thích của bạn từ nhà, văn phòng hoặc khi đi du lịch.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-white">Phim</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li className="cursor-pointer hover:text-primary-200">Đang chiếu</li>
                <li className="cursor-pointer hover:text-primary-200">Sắp chiếu</li>
                <li className="cursor-pointer hover:text-primary-200">Độc quyền</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Rạp phim</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li className="cursor-pointer hover:text-primary-200">Tất cả rạp phim</li>
                <li className="cursor-pointer hover:text-primary-200">Trải nghiệm rạp phim</li>
                <li className="cursor-pointer hover:text-primary-200">Đồ ăn & Nước uống</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Về chúng tôi</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li className="cursor-pointer hover:text-primary-200">Về chúng tôi</li>
                <li className="cursor-pointer hover:text-primary-200">Liên hệ</li>
                <li className="cursor-pointer hover:text-primary-200">Điều khoản dịch vụ</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-900 text-center text-primary-400 text-sm">
          <p>© 2025 Cinephile. Tất cả các quyền đã được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

