import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { CodeEditor } from '../components/CodeEditor';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step6_AddField: React.FC = () => {
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
          <CodeEditor 
            filename="models.py"
            existingLines={oldModelCode}
            newLines={['    content = models.TextField()']}
            insertAtLine={4}
            startDelay={30}
            highlightNew={true}
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
            <span style={{ color: '#ff9800', fontSize: 16, fontWeight: 'bold' }}>OUT OF SYNC — still on old version</span>
          </div>
          <div style={{ zoom: 0.7, opacity: 0.7 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 15, borderRadius: 8, fontFamily: 'monospace', color: '#888', marginBottom: 20 }}>
              {oldModelCode.map((l, i) => <div key={i}>{l || ' '}</div>)}
            </div>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
            />
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="The developer adds a new field to the model" />
    </AbsoluteFill>
  );
};
