import { useState } from 'react';
import { Link } from 'react-router';
import Hamburger from '../components/Hamburger';
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className="scrollbar-hide fixed z-1000 max-h-screen overflow-auto text-neutral-900 max-lg:pointer-events-none max-lg:inset-0 lg:sticky lg:top-0 lg:block lg:w-56 lg:min-w-56 lg:bg-inherit lg:text-inherit">
      <div
        className={`relative z-50 min-h-screen w-full transition-opacity duration-300 max-lg:p-4 ${isOpen ? 'pointer-events-auto opacity-100 delay-400' : 'max-lg:pointer-events-none max-lg:opacity-0'}`}
      >
        <h2 className="text-2xl font-bold">
          <Link onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>
        </h2>
        <h2 className="text-2xl font-bold">
          <Link onClick={() => setIsOpen(false)} to="/games">
            All Games
          </Link>
        </h2>
      </div>
      {/* Hamburger Button */}
      <div className="pointer-events-auto fixed right-4 bottom-4 z-50 block cursor-pointer rounded-full text-neutral-900 lg:hidden">
        <Hamburger
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      {/* Ripple Overlay */}
      <div
        className={`fixed right-4 bottom-4 z-40 h-11 w-11 transform rounded-full bg-neutral-100 transition-transform duration-800 ease-in-out will-change-transform lg:hidden ${
          isOpen ? 'scale-[62] opacity-100' : 'scale-[1]opacity-0'
        }`}
      ></div>
    </aside>
  );
}

export default SideBar;
