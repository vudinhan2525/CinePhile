// src/components/Footer.tsx
import { Film } from 'lucide-react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
