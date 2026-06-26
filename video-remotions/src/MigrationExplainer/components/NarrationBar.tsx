import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';

interface NarrationBarProps {
  text: string;
  icon?: string;
  style?: 'info' | 'success' | 'warning';
}

export const NarrationBar: React.FC<NarrationBarProps> = ({
  text,
  icon,
  style = 'info',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const colors = {
    info: '#4a9eff',
    success: '#4aff9e',
    warning: '#ffeb3b',
  };

  const borderColor = colors[style];

  return (
    <div style={{
      position: 'absolute',
      bottom: '30px',
      left: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',
      transform: `translateY(${(1 - entrance) * 80}px)`,
    }}>
      <div style={{
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        border: `2px solid ${borderColor}`,
        borderRadius: '50px',
        padding: '15px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${borderColor}44`,
        maxWidth: '80%',
      }}>
        {icon && <span style={{ fontSize: '30px' }}>{icon}</span>}
        <span style={{ 
          color: '#e0e0e0', 
          fontSize: '26px', 
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {text}
        </span>
      </div>
    </div>
  );
};
