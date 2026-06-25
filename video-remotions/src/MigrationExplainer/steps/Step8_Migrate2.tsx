import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step8_Migrate2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50 }}>
      <div style={{ display: 'flex', flex: 1, gap: 50 }}>
        <EnvironmentColumn title="DEV ENVIRONMENT" color="#4a9eff">
          <TerminalTyping 
            command="python manage.py migrate"
            output={["Applying project.0002_add_content... OK"]}
            startDelay={15}
            typingSpeed={1}
          />
          <div style={{ marginTop: 20 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at", "content"]}
              newColumns={["content"]}
            />
          </div>
        </EnvironmentColumn>
        <EnvironmentColumn title="PROD ENVIRONMENT" color="#4aff9e">
          <div style={{ zoom: 0.7 }}>
            <DatabaseTable 
              tableName="project_project"
              columns={["id", "name", "created_at"]}
            />
          </div>
        </EnvironmentColumn>
      </div>
      <NarrationBar text="The migration adds the content column to the dev database" />
    </AbsoluteFill>
  );
};
