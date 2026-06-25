import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NarrationBar } from '../components/Shared';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step5_ProdMigrate: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: '#4aff9e', textAlign: 'center', borderBottom: '4px solid #4aff9e', paddingBottom: 10, width: '100%', marginBottom: 40 }}>PROD ENVIRONMENT</h2>
      
      <div style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', gap: 40, paddingBottom: 100 }}>
        <div style={{ width: '80%' }}>
          <div style={{ color: '#4aff9e', marginBottom: 10, fontWeight: 'bold' }}>🐳 Docker Container</div>
          <TerminalTyping 
            command="python manage.py migrate"
            output={["Applying project.0001_initial... OK"]}
            startDelay={30}
          />
        </div>
        <div style={{ width: '50%' }}>
          <DatabaseTable 
            tableName="project_project"
            columns={["id", "name", "created_at"]}
            isNew={true}
            showEmptyBefore={true}
            startDelay={130}
          />
        </div>
      </div>

      <NarrationBar text="A Docker container automatically runs migrations in production" />
    </AbsoluteFill>
  );
};
