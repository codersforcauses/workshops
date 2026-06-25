import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { CodeEditor } from '../components/CodeEditor';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step3_Migrate: React.FC = () => {
  const modelCode = [
    'from django.db import models',
    '',
    'class Project(models.Model):',
    '    name = models.CharField(max_length=100)',
    '    created_at = models.DateTimeField(auto_now_add=True)',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <CodeEditor 
            filename="models.py"
            existingLines={modelCode}
          />
          <TerminalTyping 
            command="python manage.py migrate"
            output={[
              "Operations to perform:",
              "  Apply all migrations: project",
              "Running migrations:",
              "  Applying project.0001_initial... OK"
            ]}
            startDelay={30}
          />
          <div style={{ marginTop: 20 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
              isNew={true}
            />
          </div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e" grayedOut>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 24 }}>
            Nothing deployed yet
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="migrate applies the migration — creating the actual database table" />
    </AbsoluteFill>
  );
};
