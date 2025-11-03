
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-brand-primary border border-brand-accent rounded-lg shadow-lg p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-brand-light mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
