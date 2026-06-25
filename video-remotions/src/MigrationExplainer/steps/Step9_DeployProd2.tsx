import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { NarrationBar } from '../components/Shared';
import { DeploymentPipeline } from '../components/DeploymentPipeline';

export const Step9_DeployProd2: React.FC = () => {
  const frame = useCurrentFrame();
  const stepDuration = 35;
  const showFiles = frame > stepDuration * 2;

  const steps = [
    {icon: "📝", label: "PR Created"},
    {icon: "🔀", label: "PR Merged"},
    {icon: "✅", label: "CI Passes"},
    {icon: "🚀", label: "Deployed!"}
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'white', fontSize: 48, marginBottom: 60 }}>Deploying to Production</h1>
      
      <div style={{ width: '80%', marginTop: 100 }}>
        <DeploymentPipeline steps={steps} stepDuration={stepDuration} />
      </div>

      {showFiles && (
        <div style={{ marginTop: 80, display: 'flex', gap: 40 }}>
          <div style={{ backgroundColor: '#2d2d4e', padding: '15px 30px', borderRadius: 8, color: '#ffeb3b', fontSize: 24, border: '2px solid #ffeb3b' }}>
            migrations/0002_add_content.py
          </div>
        </div>
      )}

      <NarrationBar text="Code and new migration deployed to production again" />
    </AbsoluteFill>
  );
};
