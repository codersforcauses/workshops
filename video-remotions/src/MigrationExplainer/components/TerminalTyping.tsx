import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

interface TerminalTypingProps {
  command: string;
  output?: string[];
  prompt?: string;
  typingSpeed?: number;
  outputDelay?: number;
  startDelay?: number;
  title?: string;
  instant?: boolean;  // Command appears instantly (automated/Docker execution)
}

export const TerminalTyping: React.FC<TerminalTypingProps> = ({
  command,
  output = [],
  prompt = "$ ",
  typingSpeed = 2,
  outputDelay = 15,
  startDelay = 0,
  title,
  instant = false,
}) => {
  const frame = useCurrentFrame();
  const { visibleText, cursorVisible, isComplete } = useTypingAnimation(command, typingSpeed, startDelay);

  // In instant mode: command appears immediately, output starts after a short delay
  const effectiveVisibleText = instant ? (frame >= startDelay ? command : '') : visibleText;
  const effectiveCursor = instant ? false : cursorVisible;
  const commandEndFrame = instant ? startDelay + 5 : startDelay + command.length * typingSpeed;
  const outputStartFrame = commandEndFrame + outputDelay;

  const allOutputDoneFrame = outputStartFrame + output.length * 10 + 8;
  const terminalPulse = frame > allOutputDoneFrame && frame < allOutputDoneFrame + 30
    ? interpolate(frame, [allOutputDoneFrame, allOutputDoneFrame + 10, allOutputDoneFrame + 30], [0, 1, 0], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <div style={{
      backgroundColor: '#1e1e2e',
      borderRadius: '12px',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#e0e0e0',
      boxShadow: `0 10px 30px rgba(0,0,0,0.5)${terminalPulse > 0 ? `, 0 0 ${terminalPulse * 20}px rgba(74, 255, 158, ${terminalPulse * 0.5})` : ''}`,
    }}>
      {/* Title Bar */}
      <div style={{
        height: '40px',
        backgroundColor: '#2d2d4e',
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        {title && (
          <div style={{
            position: 'absolute',
            left: '0',
            right: '0',
            textAlign: 'center',
            fontSize: '14px',
            opacity: 0.8,
          }}>
            {title}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, overflow: 'hidden' }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: instant ? '#0db7ed' : '#4aff9e', marginRight: '10px' }}>{instant ? '▶ ' : prompt}</span>
          <span>{effectiveVisibleText}</span>
          {effectiveCursor && <span>|</span>}
        </div>

        {output.map((line, i) => {
          const lineStart = outputStartFrame + i * 10;
          const opacity = interpolate(frame, [lineStart, lineStart + 8], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div key={i} style={{ opacity, marginBottom: '4px' }}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};
