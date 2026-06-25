import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { NarrationBar } from '../components/Shared';
import { DeploymentPipeline } from '../components/DeploymentPipeline';

export const Step4_DeployProd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepDuration = 50;

  // Pipeline finishes at step 4: stepDuration * 4 = 200
  const pipelineDoneFrame = stepDuration * 4;
  const showFilesFrame = stepDuration * 2; // After PR Merged
  const showCalloutFrame = pipelineDoneFrame + 20;

  const steps = [
    { icon: "📝", label: "PR Created" },
    { icon: "🔀", label: "PR Merged" },
    { icon: "✅", label: "CI Passes" },
    { icon: "🚀", label: "Deployed!" },
  ];

  // File box animations
  const fileOpacity = frame > showFilesFrame
    ? interpolate(frame - showFilesFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  const fileScale = frame > showFilesFrame
    ? interpolate(
        spring({ frame: Math.max(0, frame - showFilesFrame), fps, config: { damping: 15 } }),
        [0, 1], [0.8, 1]
      )
    : 0.8;

  // Callout animation
  const calloutOpacity = frame > showCalloutFrame
    ? interpolate(frame - showCalloutFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  // Yellow glow pulse on migration file
  const migrationPulse = frame > showFilesFrame + 20 && frame < showFilesFrame + 70
    ? interpolate(frame - showFilesFrame - 20, [0, 20, 50], [0, 1, 0], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: 100 }}>
        <h1 style={{ color: 'white', fontSize: 48, marginBottom: 40 }}>Deploying to Production</h1>

        <div style={{ width: '80%', marginTop: 40 }}>
          <DeploymentPipeline steps={steps} stepDuration={stepDuration} />
        </div>

        {/* Files being deployed */}
        <div style={{
          marginTop: 60,
          opacity: fileOpacity,
          transform: `scale(${fileScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{ color: '#aaa', fontSize: 22, marginBottom: 5 }}>
            📦 Files being deployed:
          </div>
          <div style={{ display: 'flex', gap: 30 }}>
            <div style={{
              backgroundColor: '#2d2d4e',
              padding: '15px 30px',
              borderRadius: 8,
              color: '#4a9eff',
              fontSize: 24,
              border: '2px solid #4a9eff',
            }}>
              📄 models.py
            </div>
            <div style={{
              backgroundColor: '#2d2d4e',
              padding: '15px 30px',
              borderRadius: 8,
              color: '#ffeb3b',
              fontSize: 24,
              border: '2px solid #ffeb3b',
              boxShadow: migrationPulse > 0
                ? `0 0 ${migrationPulse * 25}px ${migrationPulse * 8}px rgba(255, 235, 59, ${migrationPulse * 0.5})`
                : 'none',
            }}>
              📋 migrations/0001_initial.py
            </div>
          </div>
        </div>

        {/* Key callout */}
        <div style={{
          marginTop: 30,
          opacity: calloutOpacity,
          backgroundColor: 'rgba(255, 235, 59, 0.1)',
          border: '1px solid rgba(255, 235, 59, 0.3)',
          borderRadius: 12,
          padding: '15px 30px',
          maxWidth: '80%',
        }}>
          <span style={{ color: '#ffeb3b', fontSize: 22 }}>
            💡 The migration file is shipped with the code — Docker only needs to run <span style={{ fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 4 }}>migrate</span>, not <span style={{ fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 4, textDecoration: 'line-through', opacity: 0.6 }}>makemigrations</span>
          </span>
        </div>
      </div>

      <NarrationBar text="Code AND migration files are deployed — Docker will only run migrate" />
    </AbsoluteFill>
  );
};
