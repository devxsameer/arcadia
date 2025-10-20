import { ShoppingCartIcon } from 'lucide-react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-3 md:py-4">
      <h1 className="text-lg font-extrabold tracking-wider">
        ARCADIA.
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex shrink grow items-center gap-2 rounded-lg bg-neutral-800 px-4">
          <Search
            className="hidden h-4 w-4 cursor-pointer lg:inline"
            strokeWidth={3}
          />
          <input
            className="w-full border-none py-1 outline-none placeholder:text-neutral-500"
            type="input"
            placeholder="Search Games..."
            name="search"
            id="search"
          />
        </div>
        <Link
          to="/cart"
          className="cursor-pointer transition hover:-rotate-20"
        >
          <ShoppingCart className="h-5 w-5 min-w-4" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
