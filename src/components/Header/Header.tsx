// src/components/Header.tsx
import { Film, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default Header;
