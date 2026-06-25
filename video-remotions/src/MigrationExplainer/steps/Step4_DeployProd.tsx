import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { NarrationBar } from '../components/Shared';
import { DeploymentPipeline } from '../components/DeploymentPipeline';

export const Step4_DeployProd: React.FC = () => {
  const frame = useCurrentFrame();
  const stepDuration = 50;
  const showFiles = frame > stepDuration * 2;

  const steps = [
    {icon: "📝", label: "PR Created"},
    {icon: "🔀", label: "PR Merged"},
    {icon: "✅", label: "CI Passes"},
    {icon: "🚀", label: "Deployed!"}
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: 100 }}>
        <h1 style={{ color: 'white', fontSize: 48, marginBottom: 60 }}>Deploying to Production</h1>
        
        <div style={{ width: '80%', marginTop: 100 }}>
          <DeploymentPipeline steps={steps} stepDuration={stepDuration} />
        </div>

        {showFiles && (
          <div style={{ marginTop: 80, display: 'flex', gap: 40 }}>
            <div style={{ backgroundColor: '#2d2d4e', padding: '15px 30px', borderRadius: 8, color: '#4a9eff', fontSize: 24, border: '2px solid #4a9eff' }}>
              models.py
            </div>
            <div style={{ backgroundColor: '#2d2d4e', padding: '15px 30px', borderRadius: 8, color: '#ffeb3b', fontSize: 24, border: '2px solid #ffeb3b' }}>
              migrations/0001_initial.py
            </div>
          </div>
        )}
      </div>

      <NarrationBar text="The developer's code and migration files are deployed to production via CI/CD" />
    </AbsoluteFill>
  );
};
