import { LoaderCircle } from 'lucide-react';

function LoaderBtn({ loading }) {
  return (
    <button className="mx-auto mb-8 flex w-40 cursor-pointer justify-center rounded-md bg-neutral-800 px-4 py-2 text-neutral-500">
      {loading === true ? (
        <LoaderCircle className="h-6 w-6 animate-spin" />
      ) : (
        <span>Load More</span>
      )}
    </button>
  );
}

export default LoaderBtn;
