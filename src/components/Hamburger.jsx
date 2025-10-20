export default function Hamburger({ isOpen, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={isOpen}
      aria-label="Menu"
      onClick={onClick}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded text-neutral-900"
    >
      <span className="sr-only">Menu</span>

      <svg
        className="pointer-events-none h-6 w-6 fill-current"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top line */}
        <rect
          y="7"
          width="9"
          height="2"
          rx="1"
          className={`origin-center transform transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${
            isOpen
              ? 'translate-x-0 translate-y-0 -rotate-[45deg]'
              : 'translate-x-[7px] -translate-y-[5px]'
          }`}
        />

        {/* Middle line */}
        <rect
          y="7"
          width="16"
          height="2"
          rx="1"
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] ${
            isOpen ? 'rotate-45' : ''
          }`}
        />

        {/* Bottom line */}
        <rect
          y="7"
          width="9"
          height="2"
          rx="1"
          className={`origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] ${
            isOpen
              ? 'translate-y-0 rotate-[135deg]'
              : 'translate-y-[5px]'
          }`}
        />
      </svg>
    </button>
  );
}
