import DatePickerSlider from '@components/DatePicker';
import { Clock, MapPin, Play, Star } from 'lucide-react';
import { useState } from 'react';

const MovieDetail = () => {

  const [selectedSeats, setSelectedSeats] = useState(['H10', 'H11', 'H12']);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Generate seat grid
  const generateSeatGrid = (rows, columns, soldSeats, selectedSeats) => {
    const grid = [];
    const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let i = 0; i < rows; i++) {
      const rowSeats = [];
      for (let j = 0; j < columns; j++) {
        const seatId = `${rowLabels[i]}${j + 1}`;
        let status = 'available';

        if (soldSeats.includes(seatId)) {
          status = 'sold';
        } else if (selectedSeats.includes(seatId)) {
          status = 'selected';
        }

        // Different seat types based on row
        let type = 'normal';
        if (i < 2) type = 'deluxe';
        if (i < 1) type = 'super';

        rowSeats.push({ id: seatId, status, type });
      }
      grid.push(rowSeats);
    }

    return grid;
  };

  const seatGrid = generateSeatGrid(8, 18,
    ['A5', 'A6', 'B12', 'B13', 'C7', 'C8', 'D10', 'D11', 'E15', 'F2', 'F3', 'G9'],
    selectedSeats
  );
  const showtimes = ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM", "10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"]

  return (
    <div className="bg-gradient-to-b from-primary-950 to-primary-900 min-h-screen text-white font-sans">
      {/* Header with blur background */}
      <div className="relative p-1">
        {/* Background Image with Opacity */}
        {/* <div className="absolute inset-0 bg-black opacity-70"></div> */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-primary opacity-10"
          style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPLJX5lKg6rs76c95AiUkfFIIqLKDn2HXRA&s)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 p-6 flex">
          <div className="mr-6 flex items-center justify-center">
            <div className="relative group w-40 h-60">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPLJX5lKg6rs76c95AiUkfFIIqLKDn2HXRA&s"
                alt="John Wick: Chapter 3 - Parabellum poster"
                className="w-full h-full object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40 rounded-lg">
                <Play className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-white">
                John Wick: Chapter 3 - Parabellum (2019)
              </h1>
              <div className="flex items-center space-x-4 mb-3 text-white">
                <div className="flex items-center bg-yellow-500 text-black px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span className="text-xs font-bold">8.1/10</span>
                </div>
                <span className="text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> 2h 10 min
                </span>
                <span className="text-sm">2019</span>
                <span className="text-sm">Thriller/Mystery</span>
              </div>
              <p className="text-sm text-gray-300 mb-4 max-w-md">
                Super-assassin John Wick is on the run after killing a member of the international assassin's guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.
              </p>
              <div className="flex space-x-3 mb-2">
                <span className="text-xs bg-primary-700 px-2 py-1 rounded-full text-white">Action</span>
                <span className="text-xs bg-primary-700 px-2 py-1 rounded-full text-white">Thriller</span>
                <span className="text-xs bg-primary-700 px-2 py-1 rounded-full text-white">Crime</span>
              </div>
            </div>

            <button className="relative text-white font-medium py-2 px-2 rounded-lg flex items-center justify-center w-40 transition-all duration-300 border-s bg-primary-700 shadow-md hover:shadow-lg hover:bg-primary-600">
              Watch Trailer
              <Play className="w-5 h-5 ml-2 text-white" />
            </button>


          </div>
        </div>
      </div>


      {/* Main content */}
      <div className="grid grid-cols-3 gap-4 p-6">
        {/* Select Date & Time */}
        <div className="h-full flex flex-col bg-primary-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
          <div className="flex-grow">
            <DatePickerSlider range={5} selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
        </div>

        {/* Select Showtime */}
        <div className="h-full flex flex-col bg-primary-800 p-4 rounded-lg text-white">
          <h2 className="text-lg font-semibold mb-4">Select Showtime</h2>
          <div className="mt-2 flex flex-wrap gap-2 gap-y-0 flex-grow">
            {showtimes.map((time, index) => (
              <button
                key={index}
                className="bg-primary-700 hover:bg-primary-600 px-2 py-1 rounded text-sm h-7 text-white"
              >
                {time}
              </button>
            ))}
          </div>

        </div>

        <div
          className="relative  rounded-lg overflow-hidden text-white"
          style={{
            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX7c46efCbCKGx8NNDK5jMofuLTSXBbdrhyQ&s')", // Đường dẫn ảnh
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Overlay làm mờ dần từ phải sang trái */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"></div>

          {/* Nội dung */}
          <div className="relative z-10 p-4 flex flex-col justify-between h-full">
            {/* Thông tin rạp */}
            <div>
              <h2 className="text-xl font-semibold">Cinephile Phú Nhuận</h2>
              <div className="flex items-center mt-2 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                <span>123 Đường Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM</span>
              </div>
            </div>

            {/* Nút xem trên Google Map */}
            <a
              href="https://www.google.com/maps?q=Cinephile+Phú+Nhuận"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-black text-sm font-medium py-2 px-4 rounded-md self-start hover:bg-yellow-600 transition-colors"
            >
              Xem trên Google Maps
            </a>
          </div>
        </div>

      </div>


      <div className="p-6 bg-primary-DEFAULT rounded-t-3xl -mt-5 shadow-lg">
        <MovieSeatSelection></MovieSeatSelection>

      </div>
    </div>
  );
}

export default MovieDetail;


const MovieSeatSelection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const showtimes = ["10:00 AM", "1:30 PM", "6:00 PM", "9:00 PM"]
  return (
    <div className="bg-primary-DEFAULT min-h-screen text-white p-1">
      <div className="flex">
        {/* Left side - Ticket information (1/3 width) */}
        <div className="w-1/3 pr-4">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Your Selected Seats</h2>
            <p className="text-sm mb-3">3 Seats</p>

            <div className="flex space-x-2 mb-4">
              <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-medium rounded">H10</span>
              <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-medium rounded">H11</span>
              <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-medium rounded">H12</span>
            </div>


          </div>

          <div className="border-t border-primary-700 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Normal</span>
              <span className="text-sm">3</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Deluxe</span>
              <span className="text-sm">-</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Super</span>
              <span className="text-sm">-</span>
            </div>
          </div>

          <div className="border-t border-primary-700 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Normal</span>
              <span className="text-sm">N₫. 250k</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Deluxe</span>
              <span className="text-sm">N₫. 0</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Super</span>
              <span className="text-sm">N₫. 0</span>
            </div>
          </div>

          <div className="border-t border-primary-700 pt-4 mb-8">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">N₫. 750k</span>
            </div>
          </div>

          <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-2 rounded mb-2 flex items-center justify-center">
            <span className="mr-2">+</span> Add Foods
          </button>

          <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 rounded">
            Purchase
          </button>
        </div>

        {/* Right side - Empty space (2/3 width) */}
        <div className="w-2/3">
          <div className="flex justify-between h-32">
            <div className="flex justify-between mb-2 text-sm gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 border border-primary-400 mr-2 rounded"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary-600 mr-2 rounded"></div>
                <span>Deluxe</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 mr-2 rounded"></div>
                <span>Super</span>
              </div>
            </div>

            <div className="flex justify-between mb-2 text-sm gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-600 mr-2 rounded"></div>
                <span>Sold</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border border-primary-400 mr-2 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 mr-2 rounded"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>

          {/* Screen indicator */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-full h-4 bg-gradient-to-r from-transparent via-yellow-500 to-transparent relative">
              <div className="absolute w-full text-center text-xs -bottom-6">SCREEN THIS WAY</div>
            </div>
          </div>

          {/* Empty space for seat map */}
          <div className="h-64"></div>
        </div>
      </div>
    </div>
  );
};

// export default MovieSeatSelection;