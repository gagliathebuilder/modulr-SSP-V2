
import React from 'react';
import Card from './Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="flex items-center">
      <div className="p-3 rounded-full bg-brand-accent text-brand-blue">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-brand-light font-medium">{title}</p>
        <p className="text-2xl font-bold text-brand-text">{value}</p>
      </div>
    </Card>
  );
};

export default StatCard;
