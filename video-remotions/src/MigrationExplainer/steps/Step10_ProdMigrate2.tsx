import React from 'react';
import { AbsoluteFill } from 'remotion';
import { NarrationBar } from '../components/Shared';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step10_ProdMigrate2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: '#4aff9e', textAlign: 'center', borderBottom: '4px solid #4aff9e', paddingBottom: 10, width: '100%', marginBottom: 40 }}>PROD ENVIRONMENT</h2>
      
      <div style={{ width: '100%', display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', gap: 40, paddingBottom: 100 }}>
        <div style={{ width: '80%' }}>
          <div style={{ color: '#4aff9e', marginBottom: 10, fontWeight: 'bold' }}>🐳 Docker Container</div>
          <TerminalTyping 
            command="python manage.py migrate"
            output={["Applying project.0002_add_content... OK"]}
            startDelay={30}
            instant={true}
            title="Docker: web-app"
          />
        </div>
        <div style={{ width: '50%' }}>
          <DatabaseTable 
            tableName="project_project"
            columns={["id", "name", "created_at", "content"]}
            newColumns={["content"]}
            startDelay={75}
          />
        </div>
      </div>

      <NarrationBar text="Docker runs the new migration — production database now matches development! 🎉" />
    </AbsoluteFill>
  );
};
