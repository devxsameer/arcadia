import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router';
function Error({ message }) {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <ShieldAlert className="m-4 h-15 w-15 text-rose-800" />
      <span className="mb-4 max-w-xl">
        Error: <span className="text-2xl">{message}</span>{' '}
      </span>
      <Link
        to="/"
        className="rounded-md border bg-neutral-200 px-4 py-1 text-sm font-semibold text-neutral-900 transition-transform will-change-transform hover:scale-105"
      >
        Back to home
      </Link>
    </div>
  );
}

export default Error;
