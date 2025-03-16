import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface DateItem {
  day: string;
  weekday: string;
  month: string;
  fullDate: string;
  isToday: boolean;
}

interface DatePickerSliderProps {
  range?: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
  containerClass?: string; // Added containerClass prop
}

const DatePickerSlider: React.FC<DatePickerSliderProps> = ({
  range = 5,
  selectedDate,
  onDateChange,
  containerClass, // Default containerClass value
}) => {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    generateDates();
  }, []);

  const generateDates = () => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const newDates = Array.from({ length: range }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const fullDate = date.toISOString().split("T")[0];
      return {
        day: date.getDate().toString().padStart(2, "0"),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: fullDate,
        isToday: fullDate === todayString,
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

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - Math.ceil(range / 2), 0));
  };

  const handleNext = () => {
    const newStartIndex = startIndex + 1;
    if (newStartIndex + range <= dates.length) {
      setStartIndex(newStartIndex);
    } else {
      setStartIndex(dates.length - range);
    }
  };

  return (
    <div className={`w-full max-w-md ${containerClass}`}>
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-2 transition-all duration-200 hover:text-yellow-500 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative overflow-hidden">
          <div
            className="flex space-x-3 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 60}px)` }}
          >
            {dates.map((date, index) => {
              const isSelected = date.fullDate === selectedDate;
              const opacity = getOpacity(index);

              return (
                <button
                  key={date.fullDate}
                  className={`flex flex-col items-center justify-center px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${isSelected
                    ? "bg-yellow-500 text-black shadow-lg"
                    : date.isToday
                      ? "bg-blue-500 text-white"
                      : "bg-transparent text-white"
                    }`}
                  style={{ opacity }}
                  onClick={() => onDateChange(date.fullDate)}
                >
                  <span className="text-xs font-medium">{date.month}</span>
                  <span className="text-lg font-bold">{date.day}</span>
                  <span className="text-xs">{date.weekday}</span>
                  {date.isToday && (
                    <span className="text-xs text-yellow-300">Today</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

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