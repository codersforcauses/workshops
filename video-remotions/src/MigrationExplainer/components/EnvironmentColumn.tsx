import React from 'react';

interface EnvironmentColumnProps {
  type: 'dev' | 'prod';
  children: React.ReactNode;
}

export const EnvironmentColumn: React.FC<EnvironmentColumnProps> = ({
  type,
  children,
}) => {
  const isDev = type === 'dev';
  const color = isDev ? '#4a9eff' : '#4aff9e';
  const label = isDev ? '💻 DEV' : '☁️ PROD';

  return (
    <div style={{
      flex: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${color}33`,
      backgroundColor: 'rgba(255,255,255,0.02)',
    }}>
      <div style={{
        padding: '15px 25px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: color,
        borderBottom: `4px solid ${color}`,
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}>
        {label}
      </div>
      <div style={{
        flex: 1,
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>
        {children}
      </div>
    </div>
  );
};
