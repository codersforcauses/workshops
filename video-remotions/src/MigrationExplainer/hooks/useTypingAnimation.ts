import { useCurrentFrame } from 'remotion';

export function useTypingAnimation(text: string, speed: number = 2, startFrame: number = 0): {
  visibleText: string;
  cursorVisible: boolean;
  isComplete: boolean;
} {
  const frame = useCurrentFrame();
  const charsShown = Math.max(0, Math.floor((frame - startFrame) / speed));
  const visibleText = text.slice(0, Math.min(charsShown, text.length));
  
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;
  const isComplete = charsShown >= text.length;

  return {
    visibleText,
    cursorVisible,
    isComplete,
  };
}
