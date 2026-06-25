import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { TerminalTyping } from './TerminalTyping';
import { DatabaseTable } from './DatabaseTable';

interface DockerMigrationProps {
  command: string;
  output: string[];
  dbColumns: string[];
  newColumns?: string[];
  startDelay?: number;
}

export const DockerMigration: React.FC<DockerMigrationProps> = ({
  command,
  output,
  dbColumns,
  newColumns = [],
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Container appears
  const containerScale = spring({
    frame: frame - startDelay,
    fps,
    config: { damping: 12 },
  });

  const terminalStart = startDelay + 30;
  const commandDuration = command.length * 2 + 15 + output.length * 10;
  const arrowStart = terminalStart + commandDuration;

  // Phase 3: Arrow animation
  const arrowProgress = interpolate(frame, [arrowStart, arrowStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: '100%' }}>
      {/* Docker Container */}
      <div style={{
        width: '600px',
        height: '400px',
        border: '4px dashed #0db7ed',
        borderRadius: '20px',
        backgroundColor: 'rgba(13, 183, 237, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        transform: `scale(${containerScale})`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', color: '#0db7ed', fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ marginRight: '10px' }}>🐳</span>
          <span>Docker Container</span>
        </div>
        
        <div style={{ flex: 1 }}>
          <TerminalTyping 
            command={command}
            output={output}
            startDelay={terminalStart}
          />
        </div>
      </div>

      {/* Connection Arrow */}
      <div style={{ width: '100px', height: '4px', backgroundColor: '#444', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          backgroundColor: '#0db7ed',
          width: `${arrowProgress * 100}%`,
        }} />
        <div style={{
          position: 'absolute',
          right: '-10px',
          top: '-8px',
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderLeft: `12px solid ${arrowProgress > 0.9 ? '#0db7ed' : '#444'}`,
        }} />
      </div>

      {/* Resulting DB Table */}
      <div style={{ width: '500px' }}>
        <DatabaseTable 
          tableName="project_project"
          columns={dbColumns}
          newColumns={frame > arrowStart + 20 ? newColumns : []}
          startDelay={arrowStart + 10}
        />
      </div>
    </div>
  );
};
