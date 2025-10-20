import Masonry from 'react-masonry-css';

export default function Gallery({ children }) {
  const breakpointColumns = {
    default: 4,
    1280: 3,
    768: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {children}
    </Masonry>
  );
}
