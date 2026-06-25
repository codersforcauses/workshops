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
          <div style={{ backgroundColor: '#1e1e3f', padding: 10, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0', marginTop: 10 }}>
            <div style={{ color: '#666', marginBottom: 3 }}>📋 migrations/</div>
            <div>0001_initial.py</div>
          </div>
          <div style={{ marginTop: 10, zoom: 0.85 }}>
            <DatabaseTable
              tableName="project_project"
              columns={["id", "name", "created_at"]}
            />
          </div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e">
          <div style={{ zoom: 0.7 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 15, borderRadius: 8, fontFamily: 'monospace', color: '#888', marginBottom: 15 }}>
              {oldModelCode.map((l, i) => <div key={i}>{l || ' '}</div>)}
            </div>
            <div style={{ backgroundColor: '#1e1e3f', padding: 12, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#888', marginBottom: 15 }}>
              <div style={{ color: '#666', marginBottom: 5 }}>📋 migrations/</div>
              <div>0001_initial.py</div>
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
