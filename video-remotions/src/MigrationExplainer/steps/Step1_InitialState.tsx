import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { CodeEditor } from '../components/CodeEditor';

export const Step1_InitialState: React.FC = () => {
  const modelCode = [
    'from django.db import models',
    '',
    'class Project(models.Model):',
    '    name = models.CharField(max_length=100)',
    '    created_at = models.DateTimeField(auto_now_add=True)',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50, paddingBottom: 100 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <CodeEditor 
            filename="models.py"
            existingLines={[]}
            newLines={modelCode}
            startDelay={30}
          />
          <div style={{ marginTop: 20, color: '#888', fontStyle: 'italic' }}>No migrations yet</div>
          <div style={{ marginTop: 10, color: '#888', fontStyle: 'italic' }}>No database yet</div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e" grayedOut>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 24 }}>
            Nothing deployed yet
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="A developer writes a Django model — this defines the data structure" />
    </AbsoluteFill>
  );
};
