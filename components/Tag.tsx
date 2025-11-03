
import React from 'react';

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="inline-block bg-brand-accent text-brand-text text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
      {children}
    </span>
  );
};

export default Tag;
