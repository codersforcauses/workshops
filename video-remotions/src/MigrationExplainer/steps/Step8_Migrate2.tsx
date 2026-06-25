import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step8_Migrate2: React.FC = () => {
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
          <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0', marginTop: 10 }}>
            <div style={{ color: '#666', marginBottom: 3 }}>📋 migrations/</div>
            <div>0001_initial.py</div>
            <div>0002_add_content.py</div>
          </div>
          <TerminalTyping 
            command="python manage.py migrate"
            output={["Applying project.0002_add_content... OK"]}
            startDelay={15}
            typingSpeed={1}
          />
          <div style={{ marginTop: 10 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at", "content"]}
              newColumns={["content"]}
              startDelay={100}
            />
          </div>
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
            <span style={{ color: '#ff9800', fontSize: 16, fontWeight: 'bold' }}>OUT OF SYNC — needs deploy + migrate</span>
          </div>
          <div style={{ zoom: 0.7, opacity: 0.7 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 13, color: '#888', marginBottom: 15 }}>
              <div style={{ color: '#666', marginBottom: 3 }}>📄 models.py</div>
              {oldModelCode.map((l, i) => <div key={i}>{l || '\u00A0'}</div>)}
            </div>
            <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#888', marginBottom: 15 }}>
              <div style={{ color: '#666', marginBottom: 3 }}>📋 migrations/</div>
              <div>0001_initial.py</div>
              <div style={{ color: '#666', fontStyle: 'italic' }}>{'(missing 0002_add_content.py)'}</div>
            </div>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
            />
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="The migration adds the content column to the dev database — production is now behind" />
    </AbsoluteFill>
  );
};
