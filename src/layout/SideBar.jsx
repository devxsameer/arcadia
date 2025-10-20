import { Link } from 'react-router';

function SideBar() {
  return (
    <aside className="scrollbar-hide fixed bottom-0 hidden max-h-screen overflow-auto bg-neutral-200 text-neutral-900 max-lg:inset-0 lg:sticky lg:top-0 lg:block lg:w-56 lg:min-w-56 lg:bg-inherit lg:text-inherit">
      <div className="min-h-screen pt-4">
        <h2 className="text-2xl font-bold">
          <Link to="/">Home</Link>
        </h2>
        <h2 className="text-2xl font-bold">
          <Link to="/games">All Games</Link>
        </h2>
      </div>
    </aside>
  );
}

export default SideBar;
