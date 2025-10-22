import { useState } from 'react';

const CollapsibleParagraph = ({ text, limit = 500 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const displayText = expanded
    ? text
    : text.slice(0, limit) + (text.length > limit ? '...' : '');

  return (
    <p className="py-2 text-sm text-neutral-500 md:text-base">
      {displayText}{' '}
      {text.length > limit && (
        <button
          onClick={toggleExpanded}
          className="ml-1 text-neutral-300 hover:underline focus:outline-none"
        >
          {expanded ? 'read less' : 'read more'}
        </button>
      )}
    </p>
  );
};

export default CollapsibleParagraph;
