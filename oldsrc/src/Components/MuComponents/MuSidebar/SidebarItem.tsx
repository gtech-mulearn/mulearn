import React, { ReactNode } from 'react';

interface SideBarItemProps {
  isActive: boolean;
  icon: ReactNode;
  activeIcon?: ReactNode;
  children: ReactNode;
}

const SideBarItem = ({
  isActive,
  icon,
  activeIcon,
  children,
}: SideBarItemProps) => {
  const IconComponent = isActive && activeIcon ? activeIcon : icon;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: isActive ? 'rgba(1, 75, 178, 1)' : 'transparent',
        color: isActive ? 'white' : 'rgba(1, 75, 178, 1)',
        borderRadius: '12px',
        fontWeight: '600',
        gap: '10px',
        cursor: 'pointer',
      }}
    >
      {IconComponent}
      {children}
    </div>
  );
};

export default SideBarItem;
