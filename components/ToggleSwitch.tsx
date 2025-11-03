
import React, { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  initialChecked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-brand-light">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className={`block w-14 h-8 rounded-full ${isChecked ? 'bg-brand-blue' : 'bg-brand-accent'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isChecked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
