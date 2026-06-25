import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { CodeEditor } from '../components/CodeEditor';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step7_MakeMigrations2: React.FC = () => {
  const modelCode = [
    'from django.db import models',
    '',
    'class Project(models.Model):',
    '    name = models.CharField(max_length=100)',
    '    created_at = models.DateTimeField(auto_now_add=True)',
    '    content = models.TextField()',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50, paddingBottom: 100 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <CodeEditor 
            filename="models.py"
            existingLines={modelCode}
          />
          <TerminalTyping 
            command="python manage.py makemigrations"
            output={["Migrations for 'project':", "  project/migrations/0002_add_content.py"]}
            startDelay={15}
            typingSpeed={1}
          />
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e">
          <div style={{
            backgroundColor: 'rgba(255, 152, 0, 0.12)',
            border: '1px solid rgba(255, 152, 0, 0.4)',
            borderRadius: 8,
            padding: '8px 16px',
            marginBottom: 15,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <span style={{ color: '#ff9800', fontSize: 16, fontWeight: 'bold' }}>OUT OF SYNC — missing new field</span>
          </div>
          <div style={{ zoom: 0.7, opacity: 0.7 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
            />
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="Another migration file is generated for the new field" />
    </AbsoluteFill>
  );
};
