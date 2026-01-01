import React from 'react';
import './MuShepherdTour.css';

interface MuShepherdTourButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MuShepherdTourButton: React.FC<MuShepherdTourButtonProps> = ({
  onClick,
  children = 'Take a Tour',
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false
}) => {
  const baseClasses = 'mu-shepherd-start-btn';
  const variantClasses = {
    primary: 'mu-shepherd-btn-primary',
    secondary: 'mu-shepherd-btn-secondary', 
    outline: 'mu-shepherd-btn-outline'
  };
  const sizeClasses = {
    sm: 'mu-shepherd-btn-sm',
    md: 'mu-shepherd-btn-md',
    lg: 'mu-shepherd-btn-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default MuShepherdTourButton;