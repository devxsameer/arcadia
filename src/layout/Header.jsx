import { Search } from 'lucide-react';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-4">
      <h1 className="text-lg font-extrabold tracking-wider">
        ARCADIA.
      </h1>
      <div>
        <div className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4">
          <input
            className="border-none py-1 outline-none placeholder:text-neutral-500"
            type="input"
            placeholder="Search Games..."
            name="search"
            id="search"
          />
          <Search className="h-4 w-4" strokeWidth={3} />
        </div>
      </div>
    </header>
  );
}

export default Header;
