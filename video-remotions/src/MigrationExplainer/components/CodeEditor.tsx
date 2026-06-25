import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

interface CodeEditorProps {
  filename: string;
  existingLines: string[];
  newLines?: string[];
  insertAtLine?: number;
  typingSpeed?: number;
  startDelay?: number;
  highlightNew?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  filename,
  existingLines,
  newLines = [],
  insertAtLine = existingLines.length,
  typingSpeed = 2,
  startDelay = 0,
  highlightNew = true,
}) => {
  const frame = useCurrentFrame();
  
  const allLinesBeforeNew = existingLines.slice(0, insertAtLine);
  const allLinesAfterNew = existingLines.slice(insertAtLine);
  
  const combinedNewText = newLines.join('\n');
  const { visibleText } = useTypingAnimation(combinedNewText, typingSpeed, startDelay);
  const typedLines = visibleText.split('\n');

  const typingDoneFrame = startDelay + combinedNewText.length * typingSpeed;
  const editorPulse = (newLines.length > 0 && frame > typingDoneFrame && frame < typingDoneFrame + 30)
    ? interpolate(frame, [typingDoneFrame, typingDoneFrame + 10, typingDoneFrame + 30], [0, 1, 0], { extrapolateRight: 'clamp' })
    : 0;

  const linesToDisplay = [
    ...allLinesBeforeNew,
    ...typedLines,
    ...allLinesAfterNew,
  ];

  const isLineNew = (index: number) => {
    return index >= insertAtLine && index < insertAtLine + typedLines.length;
  };

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
      fontSize: '20px',
      color: '#e0e0e0',
      boxShadow: `0 10px 30px rgba(0,0,0,0.5)${editorPulse > 0 ? `, 0 0 ${editorPulse * 20}px rgba(255, 235, 59, ${editorPulse * 0.5})` : ''}`,
    }}>
      {/* Tab */}
      <div style={{
        height: '40px',
        backgroundColor: '#2d2d4e',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        width: 'fit-content',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        color: '#4a9eff',
      }}>
        <span style={{ marginRight: '8px' }}>📄</span>
        <span>{filename}</span>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Line Numbers */}
        <div style={{
          width: '50px',
          backgroundColor: '#16161e',
          color: '#666',
          textAlign: 'right',
          padding: '20px 10px',
          userSelect: 'none',
        }}>
          {linesToDisplay.map((_, i) => (
            <div key={i} style={{ height: '28px' }}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <div style={{ padding: '20px 0', flex: 1 }}>
          {linesToDisplay.map((line, i) => {
            const isNew = isLineNew(i);
            return (
              <div key={i} style={{
                height: '28px',
                padding: '0 20px',
                backgroundColor: isNew ? 'rgba(255,235,59,0.08)' : 'transparent',
                borderLeft: (isNew && highlightNew) ? '3px solid #ffeb3b' : '3px solid transparent',
                whiteSpace: 'pre',
              }}>
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
