import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DateItem {
  day: string;
  weekday: string;
  month: string;
  fullDate: string;
}

interface DatePickerSliderProps {
  range?: number; // Số ngày hiển thị (mặc định: 5)
  selectedDate: string; // Ngày được chọn
  onDateChange: (date: string) => void; // Callback khi thay đổi ngày
}

const DatePickerSlider: React.FC<DatePickerSliderProps> = ({
  range = 5,
  selectedDate,
  onDateChange,
}) => {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    generateDates();
  }, []);

  useEffect(() => {
    const index = dates.findIndex((date) => date.fullDate === selectedDate);
    if (index !== -1) {
      // Chỉ cập nhật startIndex nếu ngày được chọn nằm ngoài vùng hiện tại
      if (index < startIndex || index >= startIndex + range) {
        setStartIndex(Math.max(index - Math.floor(range / 2), 0));
      }
    }
  }, [selectedDate, dates, range]);

  // Tạo danh sách ngày
  const generateDates = () => {
    const today = new Date();
    const newDates = Array.from({ length: range }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i - Math.floor(range / 2));
      return {
        day: date.getDate().toString().padStart(2, "0"),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toISOString().split("T")[0],
      };
    });
    setDates(newDates);
  };

  const getOpacity = (index: number) => {
    const selectedIndex = dates.findIndex((date) => date.fullDate === selectedDate);
    if (selectedIndex === -1) return 1;

    const maxDistance = Math.floor(range / 2);
    const distance = Math.abs(index - selectedIndex);

    return Math.max(1 - (distance / maxDistance) * (1 - 0.3), 0.3);
  };


  // Xử lý nút cuộn trái
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - Math.ceil(range / 2), 0));
  };

  // Xử lý nút cuộn phải
  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + Math.ceil(range / 2), dates.length - range));
  };

  return (
    <div className="bg-primary-800 rounded-lg p-4 w-full max-w-md">
      {/* Date List */}
      <div className="flex items-center justify-between">
        {/* Nút Trái */}
        <button
          onClick={handlePrev}
          className="p-2 transition-all duration-200 hover:text-yellow-500 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Danh sách ngày */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex space-x-3 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 60}px)` }} // Dịch chuyển danh sách
          >
            {dates.map((date, index) => {
              const isSelected = date.fullDate === selectedDate;
              const opacity = getOpacity(index);

              return (
                <button
                  key={date.fullDate}
                  className="flex flex-col items-center justify-center px-3 py-2 rounded-md transition-all duration-300"
                  style={{
                    opacity,
                    transform: `scale(${isSelected ? 1.1 : 1})`,
                    backgroundColor: isSelected ? "yellow" : "transparent",
                    color: isSelected ? "black" : "white",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={() => onDateChange(date.fullDate)}
                >
                  <span className="text-xs font-medium">{date.month}</span>
                  <span className="text-lg font-bold">{date.day}</span>
                  <span className="text-xs">{date.weekday}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nút Phải */}
        <button
          onClick={handleNext}
          className="p-2 transition-all duration-200 hover:text-yellow-500 disabled:opacity-50"
          disabled={startIndex + range >= dates.length}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DatePickerSlider;
