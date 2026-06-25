import React from 'react';

interface EnvironmentColumnProps {
  title: string;
  color: string;
  children: React.ReactNode;
  grayedOut?: boolean;
}

export const EnvironmentColumn: React.FC<EnvironmentColumnProps> = ({
  title,
  color,
  children,
  grayedOut = false,
}) => {
  return (
    <div style={{
      flex: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${color}33`,
      backgroundColor: grayedOut ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)',
      opacity: grayedOut ? 0.5 : 1,
    }}>
      <div style={{
        padding: '15px 25px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: color,
        borderBottom: `4px solid ${color}`,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}>
        {title}
      </div>
      <div style={{
        flex: 1,
        padding: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}>
        {children}
      </div>
    </div>
  );
};
