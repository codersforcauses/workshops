import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface PipelineStep {
  icon: string;
  label: string;
}

interface DeploymentPipelineProps {
  steps: PipelineStep[];
  stepDuration?: number;
  startDelay?: number;
}

export const DeploymentPipeline: React.FC<DeploymentPipelineProps> = ({
  steps,
  stepDuration = 40,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      width: '100%',
      height: '200px',
    }}>
      {steps.map((step, i) => {
        const stepStart = startDelay + i * stepDuration;
        const stepActivation = spring({
          frame: frame - stepStart,
          fps,
          config: { damping: 12 },
        });

        const isCompleted = frame > stepStart + stepDuration;
        const isActive = frame >= stepStart && frame <= stepStart + stepDuration;

        const borderColor = isCompleted ? '#4aff9e' : (isActive ? '#4a9eff' : '#333');
        const glow = isActive ? '0 0 20px rgba(74,159,255,0.6)' : (isCompleted ? '0 0 15px rgba(74,255,158,0.4)' : 'none');

        return (
          <React.Fragment key={i}>
            <div style={{
              width: '180px',
              height: '90px',
              borderRadius: '12px',
              border: `3px solid ${borderColor}`,
              boxShadow: glow,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1e1e2e',
              transform: `scale(${stepActivation})`,
              transition: 'none', // Strict rule: no CSS transitions
            }}>
              <span style={{ fontSize: '30px', marginBottom: '5px' }}>{step.icon}</span>
              <span style={{ fontSize: '16px', color: '#e0e0e0' }}>{step.label}</span>
            </div>

            {i < steps.length - 1 && (
              <div style={{
                width: '60px',
                height: '4px',
                backgroundColor: '#333',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  backgroundColor: '#4a9eff',
                  width: interpolate(frame, [stepStart + stepDuration - 10, stepStart + stepDuration], [0, 60], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }} />
                <div style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '-8px',
                  borderTop: '10px solid transparent',
                  borderBottom: '10px solid transparent',
                  borderLeft: `12px solid ${frame > stepStart + stepDuration ? '#4a9eff' : '#333'}`,
                }} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
