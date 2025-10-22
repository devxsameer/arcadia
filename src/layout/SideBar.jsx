import { useState } from 'react';
import { NavLink } from 'react-router';
import Hamburger from '../components/Hamburger';
import {
  House,
  Gamepad2,
  Trophy,
  Sparkles,
  Crown,
} from 'lucide-react';
import { Shapes } from 'lucide-react';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable link styles
  const navLinkClasses = ({ isActive }) => {
    const base =
      'flex items-center gap-2 rounded-md border  px-2 py-1 transition-colors duration-200';
    return isActive
      ? `${base} border-neutral-800 bg-neutral-900 max-lg:bg-neutral-300 max-lg:border-neutral-400`
      : `${base} border-neutral-950 max-lg:border-neutral-100 hover:text-neutral-500 max-lg:hover:text-neutral-600`;
  };

  // Dynamic year for Popular in 20XX
  const currentYear = new Date().getFullYear();

  return (
    <aside className="scrollbar-hide fixed z-[1000] max-h-screen overflow-auto text-neutral-900 max-lg:pointer-events-none max-lg:inset-0 lg:sticky lg:top-0 lg:block lg:w-56 lg:min-w-56 lg:bg-inherit lg:text-neutral-300">
      {/* Sidebar Content */}
      <div
        className={`relative z-50 flex w-full flex-col gap-2 px-2 py-4 transition-opacity duration-300 max-lg:min-h-screen max-lg:p-4 ${
          isOpen
            ? 'pointer-events-auto opacity-100 delay-400'
            : 'max-lg:pointer-events-none max-lg:opacity-0'
        }`}
      >
        {/* --- MAIN LINKS --- */}
        <NavLink
          to="/"
          className={navLinkClasses}
          onClick={() => setIsOpen(false)}
        >
          <House className="h-5 w-5" /> Home
        </NavLink>

        <NavLink
          to="/games"
          className={navLinkClasses}
          onClick={() => setIsOpen(false)}
          end
        >
          <Gamepad2 className="h-5 w-5" /> All Games
        </NavLink>

        <NavLink
          to="/genres"
          className={navLinkClasses}
          onClick={() => setIsOpen(false)}
          end
        >
          <Shapes className="h-5 w-5" /> Genres
        </NavLink>

        {/* --- TOP SECTION --- */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs tracking-widest text-neutral-300 uppercase max-lg:text-neutral-800">
            Top
          </h4>

          <NavLink
            to="/discover/best-of-the-year"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Trophy className="h-5 w-5" /> Best of The Year
          </NavLink>

          <NavLink
            to="/discover/popular-in-current-year"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Sparkles className="h-5 w-5" /> Popular in {currentYear}
          </NavLink>

          <NavLink
            to="/discover/all-time-top"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Crown className="h-5 w-5" /> All Time Top
          </NavLink>
        </div>
        {/* --- NEW RELEASES SECTION --- */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs tracking-widest text-neutral-300 uppercase max-lg:text-neutral-800">
            New Releases
          </h4>

          <NavLink
            to="/discover/last-30-days"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Trophy className="h-5 w-5" /> Last 30 Days
          </NavLink>

          <NavLink
            to="/discover/this-week"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Sparkles className="h-5 w-5" /> This Week
          </NavLink>

          <NavLink
            to="/discover/next-week"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            <Crown className="h-5 w-5" /> Next Week
          </NavLink>
        </div>
      </div>

      {/* --- HAMBURGER BUTTON --- */}
      <div className="pointer-events-auto fixed right-4 bottom-4 z-50 block cursor-pointer rounded-full text-neutral-900 lg:hidden">
        <Hamburger
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {/* --- RIPPLE OVERLAY --- */}
      <div
        className={`fixed right-4 bottom-4 z-40 h-11 w-11 transform rounded-full bg-neutral-100 transition-transform duration-800 ease-in-out will-change-transform lg:hidden ${
          isOpen ? 'scale-[62]' : 'scale-[1]'
        }`}
      ></div>
    </aside>
  );
}

export default SideBar;
