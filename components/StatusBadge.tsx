
import React from 'react';

interface StatusBadgeProps {
  status: 'Active' | 'Paused' | 'Ended' | 'Win' | 'Loss';
}

const statusStyles = {
  Active: 'bg-green-500/20 text-green-400',
  Win: 'bg-green-500/20 text-green-400',
  Paused: 'bg-yellow-500/20 text-yellow-400',
  Ended: 'bg-gray-500/20 text-gray-400',
  Loss: 'bg-red-500/20 text-red-400',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
