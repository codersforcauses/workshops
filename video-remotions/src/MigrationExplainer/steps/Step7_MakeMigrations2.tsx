import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
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

  const oldModelCode = [
    'from django.db import models',
    '',
    'class Project(models.Model):',
    '    name = models.CharField(max_length=100)',
    '    created_at = models.DateTimeField(auto_now_add=True)',
  ];

  const SAMPLE_ROWS_3COL = [
    ['1', 'My Blog', '2024-01-15'],
    ['2', 'Portfolio', '2024-03-22'],
    ['3', 'Shop App', '2024-06-10'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50, paddingBottom: 100 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: '#e0e0e0' }}>
            <div style={{ color: '#666', marginBottom: 3 }}>📄 models.py</div>
            {modelCode.map((l, i) => (
              <div key={i} style={{ color: l.includes('content') ? '#ffeb3b' : '#e0e0e0' }}>{l || '\u00A0'}</div>
            ))}
          </div>
          <TerminalTyping 
            command="python manage.py makemigrations"
            output={["Migrations for 'project':", "  project/migrations/0002_add_content.py"]}
            startDelay={15}
            typingSpeed={1}
          />
          <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0', marginTop: 10 }}>
            <div style={{ color: '#666', marginBottom: 3 }}>📋 migrations/</div>
            <div>0001_initial.py</div>
            <div style={{ color: '#ffeb3b' }}>0002_add_content.py ⬅️ NEW</div>
          </div>
          <div style={{ marginTop: 10, zoom: 0.8 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
              rows={[['1', 'Test', '2024-01-01']]}
              rowCount={1}
            />
          </div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e">
          <div style={{ zoom: 0.7 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: '#888', marginBottom: 15 }}>
              <div style={{ color: '#666', marginBottom: 3 }}>📄 models.py</div>
              {oldModelCode.map((l, i) => <div key={i}>{l || '\u00A0'}</div>)}
            </div>
            <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#888', marginBottom: 15 }}>
              <div style={{ color: '#666', marginBottom: 3 }}>📋 migrations/</div>
              <div>0001_initial.py</div>
            </div>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
              rows={SAMPLE_ROWS_3COL}
              rowCount={47}
            />
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="Another migration file is generated for the new field — note both files accumulate" />
    </AbsoluteFill>
  );
};
