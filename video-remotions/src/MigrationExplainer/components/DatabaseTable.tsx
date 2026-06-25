import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface DatabaseTableProps {
  tableName: string;
  columns: string[];
  isNew?: boolean;
  newColumns?: string[];
  startDelay?: number;
}

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  tableName,
  columns,
  isNew = false,
  newColumns = [],
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = isNew 
    ? interpolate(frame - startDelay, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <div style={{
      opacity,
      fontFamily: 'sans-serif',
      color: '#e0e0e0',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
        <span style={{ marginRight: '10px' }}>🗄️</span>
        <span>{tableName}</span>
      </div>
      
      <div style={{
        display: 'flex',
        border: '1px solid #444',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1e1e2e',
      }}>
        {columns.map((col, i) => {
          const isColNew = newColumns.includes(col);
          const colSpring = spring({
            frame: frame - startDelay,
            fps,
            config: { damping: 12 },
          });

          const width = isColNew 
            ? interpolate(colSpring, [0, 1], [0, 150])
            : 150;

          return (
            <div key={i} style={{
              width,
              minWidth: isColNew ? 0 : 150,
              borderRight: i < columns.length - 1 ? '1px solid #444' : 'none',
              overflow: 'hidden',
              flexShrink: isColNew ? 0 : 1,
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: '#2d2d4e',
                fontWeight: 'bold',
                color: isColNew ? '#ffeb3b' : '#4a9eff',
                borderBottom: '1px solid #444',
                whiteSpace: 'nowrap',
              }}>
                {col}
              </div>
              <div style={{ padding: '12px', height: '40px', backgroundColor: '#1e1e2e' }}>
                {/* Empty data row placeholder */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
