import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

interface DatabaseTableProps {
  tableName: string;
  columns: string[];
  isNew?: boolean;
  newColumns?: string[];
  startDelay?: number;
  showEmptyBefore?: boolean;
  rows?: string[][];           // visible data rows
  rowCount?: number;           // badge: "(N rows)" — implies more than shown
  nullColumns?: string[];      // columns where existing rows show NULL
  rowAppearDelay?: number;     // frame offset before rows start appearing
}

export const DatabaseTable: React.FC<DatabaseTableProps> = ({
  tableName,
  columns,
  isNew = false,
  newColumns = [],
  startDelay = 0,
  showEmptyBefore = false,
  rows = [],
  rowCount,
  nullColumns = [],
  rowAppearDelay = 0,
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

  // Empty state before data arrives
  if (shouldShowEmpty) {
    return (
      <div style={{ fontFamily: 'monospace', color: '#e0e0e0', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>
          <span style={{ marginRight: '8px' }}>🗄️</span>
          <span>{tableName || 'Database'}</span>
        </div>
        <div style={{
          border: '2px dashed #444',
          borderRadius: '8px',
          backgroundColor: 'rgba(30, 30, 46, 0.5)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60px',
        }}>
          <span style={{ color: '#666', fontSize: '16px', fontStyle: 'italic' }}>
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

  const contentScale = isNew
    ? interpolate(
        spring({ frame: Math.max(0, frame - startDelay), fps, config: { damping: 15 } }),
        [0, 1], [0.9, 1]
      )
    : 1;

  const rowStartFrame = startDelay + rowAppearDelay;

  return (
    <div style={{
      opacity: contentOpacity,
      transform: `scale(${contentScale})`,
      fontFamily: 'monospace',
      color: '#e0e0e0',
      width: '100%',
    }}>
      {/* Header with table name + row count badge */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', fontSize: '16px', fontWeight: 'bold' }}>
        <span style={{ marginRight: '6px' }}>🗄️</span>
        <span>{tableName}</span>
        {rowCount != null && rowCount > 0 && (
          <span style={{
            marginLeft: '10px',
            fontSize: '12px',
            color: '#4aff9e',
            backgroundColor: 'rgba(74, 255, 158, 0.12)',
            border: '1px solid rgba(74, 255, 158, 0.3)',
            borderRadius: '12px',
            padding: '2px 10px',
            fontWeight: 'normal',
          }}>
            {rowCount} rows
          </span>
        )}
        {isNew && contentOpacity > 0.5 && (
          <span style={{
            marginLeft: '10px',
            fontSize: '13px',
            color: '#ffeb3b',
            opacity: interpolate(frame - startDelay, [10, 25], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
          }}>
            ⬅️ TABLE CREATED!
          </span>
        )}
      </div>

      {/* Table */}
      <div style={{
        border: '1px solid #444',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#1e1e2e',
        boxShadow: isNew || newColumns.length > 0
          ? `0 0 ${pulse * 30}px ${pulse * 10}px rgba(255, 235, 59, ${pulse * 0.6})`
          : 'none',
      }}>
        {/* Column headers */}
        <div style={{ display: 'flex' }}>
          {columns.map((col, i) => {
            const isColNew = newColumns.includes(col);
            const colSpring = spring({
              frame: Math.max(0, frame - startDelay),
              fps,
              config: { damping: 12 },
            });

            return (
              <div key={i} style={{
                flex: isColNew ? `0 0 ${interpolate(colSpring, [0, 1], [0, 120])}px` : '1 1 0',
                minWidth: isColNew ? 0 : undefined,
                borderRight: i < columns.length - 1 ? '1px solid #444' : 'none',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '8px 10px',
                  backgroundColor: '#2d2d4e',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: isColNew ? '#ffeb3b' : '#4a9eff',
                  borderBottom: '1px solid #444',
                  whiteSpace: 'nowrap',
                }}>
                  {col}
                  {isColNew && colSpring > 0.8 && (
                    <span style={{ marginLeft: '4px', fontSize: '10px', color: '#ffeb3b' }}>NEW!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        {rows.map((row, rowIdx) => {
          const rowFrame = frame - rowStartFrame - (rowIdx * 8);
          const rowOpacity = rowAppearDelay > 0
            ? interpolate(rowFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
            : 1;

          return (
            <div key={rowIdx} style={{
              display: 'flex',
              opacity: rowOpacity,
              borderTop: '1px solid #333',
            }}>
              {columns.map((col, colIdx) => {
                const isColNew = newColumns.includes(col);
                const isNull = nullColumns.includes(col);
                const colSpring = spring({
                  frame: Math.max(0, frame - startDelay),
                  fps,
                  config: { damping: 12 },
                });

                // For new columns, get value from row if available, otherwise NULL
                const cellValue = colIdx < row.length ? row[colIdx] : null;
                const showNull = isNull || (isColNew && cellValue === null);

                return (
                  <div key={colIdx} style={{
                    flex: isColNew ? `0 0 ${interpolate(colSpring, [0, 1], [0, 120])}px` : '1 1 0',
                    minWidth: isColNew ? 0 : undefined,
                    borderRight: colIdx < columns.length - 1 ? '1px solid #333' : 'none',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '5px 10px',
                      fontSize: '12px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      color: showNull ? '#ff9800' : '#ccc',
                      fontStyle: showNull ? 'italic' : 'normal',
                      backgroundColor: showNull ? 'rgba(255, 152, 0, 0.06)' : 'transparent',
                      whiteSpace: 'nowrap',
                    }}>
                      {showNull ? 'NULL' : (cellValue || '')}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty row placeholder if no data rows */}
        {rows.length === 0 && (
          <div style={{ display: 'flex' }}>
            {columns.map((col, i) => {
              const isColNew = newColumns.includes(col);
              const colSpring = spring({
                frame: Math.max(0, frame - startDelay),
                fps,
                config: { damping: 12 },
              });
              return (
                <div key={i} style={{
                  flex: isColNew ? `0 0 ${interpolate(colSpring, [0, 1], [0, 120])}px` : '1 1 0',
                  minWidth: isColNew ? 0 : undefined,
                  borderRight: i < columns.length - 1 ? '1px solid #333' : 'none',
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '8px 10px', height: '30px', backgroundColor: '#1e1e2e' }} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
