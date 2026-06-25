import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface DatabaseTableProps {
  tableName: string;
  columns: string[];
  isNew?: boolean;
  newColumns?: string[];
  startDelay?: number;
  showEmptyBefore?: boolean;  // Show empty DB placeholder before startDelay
}

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  tableName,
  columns,
  isNew = false,
  newColumns = [],
  startDelay = 0,
  showEmptyBefore = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isBeforeDelay = frame < startDelay;
  const shouldShowEmpty = showEmptyBefore && isBeforeDelay;

  // Pulse glow after content appears
  const pulseFrame = frame - startDelay - 25;
  const pulse = pulseFrame > 0 && pulseFrame < 40
    ? interpolate(pulseFrame, [0, 15, 40], [0, 1, 0], { extrapolateRight: 'clamp' })
    : 0;

  // If showing empty state before data arrives
  if (shouldShowEmpty) {
    return (
      <div style={{
        fontFamily: 'sans-serif',
        color: '#e0e0e0',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ marginRight: '10px' }}>🗄️</span>
          <span>{tableName || 'Database'}</span>
        </div>

        <div style={{
          border: '2px dashed #444',
          borderRadius: '8px',
          backgroundColor: 'rgba(30, 30, 46, 0.5)',
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80px',
        }}>
          <span style={{ color: '#666', fontSize: '20px', fontStyle: 'italic' }}>
            No tables yet — run migrate to create
          </span>
        </div>
      </div>
    );
  }

  // Content appearing animation
  const contentOpacity = isNew
    ? interpolate(frame - startDelay, [0, 20], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
    : 1;

  // Scale-in for new table
  const contentScale = isNew
    ? interpolate(
        spring({ frame: Math.max(0, frame - startDelay), fps, config: { damping: 15 } }),
        [0, 1], [0.9, 1]
      )
    : 1;

  return (
    <div style={{
      opacity: contentOpacity,
      transform: `scale(${contentScale})`,
      fontFamily: 'sans-serif',
      color: '#e0e0e0',
      width: '100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>
        <span style={{ marginRight: '10px' }}>🗄️</span>
        <span>{tableName}</span>
        {isNew && contentOpacity > 0.5 && (
          <span style={{
            marginLeft: '15px',
            fontSize: '16px',
            color: '#ffeb3b',
            opacity: interpolate(frame - startDelay, [10, 25], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          }}>
            ⬅️ TABLE CREATED!
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        border: '1px solid #444',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#1e1e2e',
        boxShadow: isNew || newColumns.length > 0
          ? `0 0 ${pulse * 30}px ${pulse * 10}px rgba(255, 235, 59, ${pulse * 0.6})`
          : 'none',
      }}>
        {columns.map((col, i) => {
          const isColNew = newColumns.includes(col);
          const colSpring = spring({
            frame: Math.max(0, frame - startDelay),
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
                {isColNew && colSpring > 0.8 && (
                  <span style={{ marginLeft: '8px', fontSize: '14px', color: '#ffeb3b' }}>NEW!</span>
                )}
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
