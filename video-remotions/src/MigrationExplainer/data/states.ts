export const STEP_DURATIONS = [300, 330, 300, 360, 300, 270, 240, 240, 300, 270]; // total 2910

export const STEP_OFFSETS = STEP_DURATIONS.reduce((acc, dur, i) => {
  acc.push(i === 0 ? 0 : acc[i-1] + STEP_DURATIONS[i-1]);
  return acc;
}, [] as number[]);
