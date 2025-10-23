import { Heart } from 'lucide-react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchValue('');
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-3 md:py-4">
      <h1 className="cursor-pointer text-lg font-extrabold tracking-wider">
        <Link to="/">
          ARCADIA<span className="text-rose-600">.</span>
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex shrink grow items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4">
          <Search
            className="hidden h-4 w-4 cursor-pointer lg:inline"
            strokeWidth={3}
            onClick={() => handleSearch(searchValue)}
          />
          <input
            className="w-full border-none py-1 outline-none placeholder:text-neutral-500"
            type="input"
            placeholder="Search Games..."
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="search"
            onKeyDown={handleKeyDown}
          />
        </div>
        <Link
          to="/favorites"
          className="cursor-pointer text-rose-700 transition hover:-rotate-20"
        >
          <Heart className="h-5 w-5 min-w-4" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
