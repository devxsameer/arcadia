import { ChevronRight } from 'lucide-react';
import { House } from 'lucide-react';
import { Link, useLocation } from 'react-router';

function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname; // e.g., /games/123/details
  const pathParts = pathname.split('/').filter(Boolean); // ["games", "123", "details"]
  console.log(pathParts);
  const ignoredSegments = ['game'];

  return (
    <nav className="breadcrumbs py-2 text-sm">
      <ol className="flex flex-wrap space-x-1 gap-y-1 text-neutral-300">
        <li>
          <Link to="/" className="group flex items-center space-x-1">
            <House className="mr-2 h-4 w-4 group-hover:text-neutral-600" />
            <span className="group-hover:text-neutral-600">Home</span>
            <ChevronRight className="h-4 w-4 text-neutral-600" />
          </Link>
        </li>
        {pathParts.map((part, index) => {
          if (ignoredSegments.includes(part)) return null;
          // Build the path up to this breadcrumb
          const routeTo = `/${pathParts.slice(0, index + 1).join('/')}`;
          // Make it readable (capitalize and replace dashes)
          const name = part
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          // Last part shouldn't be a link
          const isLast = index === pathParts.length - 1;

          return (
            <li key={routeTo} className="min-w-max">
              {!isLast ? (
                <Link
                  to={routeTo}
                  className="group flex items-center space-x-1"
                >
                  <span className="group-hover:text-neutral-600">
                    {name}
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-600" />
                </Link>
              ) : (
                <span className="text-neutral-600">{name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
