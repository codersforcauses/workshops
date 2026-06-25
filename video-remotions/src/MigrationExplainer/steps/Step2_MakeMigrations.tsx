import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { CodeEditor } from '../components/CodeEditor';
import { TerminalTyping } from '../components/TerminalTyping';

export const Step2_MakeMigrations: React.FC = () => {
  const frame = useCurrentFrame();
  const modelCode = [
    'from django.db import models',
    '',
    'class Project(models.Model):',
    '    name = models.CharField(max_length=100)',
    '    created_at = models.DateTimeField(auto_now_add=True)',
  ];

  const showHighlight = frame > 250;

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <CodeEditor 
            filename="models.py"
            existingLines={modelCode}
          />
          <TerminalTyping 
            command="python manage.py makemigrations"
            output={["Migrations for 'project':", "  project/migrations/0001_initial.py"]}
            startDelay={30}
          />
          <div style={{ 
            marginTop: 20, 
            color: showHighlight ? '#ffeb3b' : '#eee', 
            fontWeight: showHighlight ? 'bold' : 'normal',
            transition: 'none'
          }}>
            migrations/0001_initial.py {showHighlight && '⬅️ NEW'}
          </div>
          <div style={{ marginTop: 10, color: '#888', fontStyle: 'italic' }}>No database yet</div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e" grayedOut>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 24 }}>
            Nothing deployed yet
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="makemigrations scans your models and creates a migration file" />
    </AbsoluteFill>
  );
};
