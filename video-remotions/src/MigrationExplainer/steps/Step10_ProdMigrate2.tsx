import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { EnvironmentColumn, NarrationBar } from '../components/Shared';
import { TerminalTyping } from '../components/TerminalTyping';
import { DatabaseTable } from '../components/DatabaseTable';

export const Step10_ProdMigrate2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const SAMPLE_ROWS_3COL = [
    ['1', 'My Blog', '2024-01-15'],
    ['2', 'Portfolio', '2024-03-22'],
    ['3', 'Shop App', '2024-06-10'],
  ];

  // Phase 1: Docker migration (frames 0-130)
  // Phase 2: Side-by-side comparison (frames 140+)
  const showComparison = frame > 140;
  const comparisonOpacity = showComparison
    ? interpolate(frame - 140, [0, 25], [0, 1], { extrapolateRight: 'clamp' })
    : 0;

  // "IN SYNC" banner
  const syncBannerFrame = frame - 175;
  const syncScale = syncBannerFrame > 0
    ? interpolate(
        spring({ frame: syncBannerFrame, fps, config: { damping: 12 } }),
        [0, 1], [0.5, 1]
      )
    : 0;
  const syncPulse = syncBannerFrame > 20 && syncBannerFrame < 70
    ? interpolate(syncBannerFrame, [20, 40, 70], [0, 1, 0], { extrapolateRight: 'clamp' })
    : 0;

  if (!showComparison) {
    // Phase 1: Docker running migration
    return (
      <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#4aff9e', textAlign: 'center', borderBottom: '4px solid #4aff9e', paddingBottom: 10, width: '100%', marginBottom: 40 }}>
          PROD ENVIRONMENT
        </h2>

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
              nullColumns={["content"]}
              rows={SAMPLE_ROWS_3COL}
              rowCount={47}
              startDelay={75}
            />
          </div>
        </div>

        <NarrationBar text="Docker runs the new migration in production" />
      </AbsoluteFill>
    );
  }

  // Phase 2: Side-by-side — both environments now match
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', padding: 50, opacity: comparisonOpacity }}>
      <div style={{ display: 'flex', flex: 1, gap: 40, paddingBottom: 100 }}>
        <EnvironmentColumn title="💻 DEV" color="#4a9eff">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 12, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0' }}>
              <div style={{ color: '#666', marginBottom: 5 }}>📄 models.py</div>
              <div style={{ color: '#888' }}>from django.db import models</div>
              <div>&nbsp;</div>
              <div>class Project(models.Model):</div>
              <div>    name = models.CharField(max_length=100)</div>
              <div>    created_at = models.DateTimeField(auto_now_add=True)</div>
              <div style={{ color: '#ffeb3b' }}>    content = models.TextField()</div>
            </div>
            <div style={{ backgroundColor: '#1e1e3f', padding: 12, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0' }}>
              <div style={{ color: '#666', marginBottom: 5 }}>📋 migrations/</div>
              <div>0001_initial.py</div>
              <div style={{ color: '#ffeb3b' }}>0002_add_content.py ⬅️ NEW</div>
            </div>
            <DatabaseTable
              tableName="project_project"
              columns={["id", "name", "created_at", "content"]}
              rows={[['1', 'Test', '2024-01-01', null]]}
              rowCount={1}
              nullColumns={['content']}
            />
          </div>
        </EnvironmentColumn>

        <EnvironmentColumn title="☁️ PROD" color="#4aff9e">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ backgroundColor: '#1e1e3f', padding: 12, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0' }}>
              <div style={{ color: '#666', marginBottom: 5 }}>📄 models.py</div>
              <div style={{ color: '#888' }}>from django.db import models</div>
              <div>&nbsp;</div>
              <div>class Project(models.Model):</div>
              <div>    name = models.CharField(max_length=100)</div>
              <div>    created_at = models.DateTimeField(auto_now_add=True)</div>
              <div style={{ color: '#ffeb3b' }}>    content = models.TextField()</div>
            </div>
            <div style={{ backgroundColor: '#1e1e3f', padding: 12, borderRadius: 8, fontFamily: 'monospace', fontSize: 14, color: '#e0e0e0' }}>
              <div style={{ color: '#666', marginBottom: 5 }}>📋 migrations/</div>
              <div>0001_initial.py</div>
              <div style={{ color: '#ffeb3b' }}>0002_add_content.py ⬅️ NEW</div>
            </div>
            <DatabaseTable
              tableName="project_project"
              columns={["id", "name", "created_at", "content"]}
              rows={SAMPLE_ROWS_3COL}
              rowCount={47}
              nullColumns={['content']}
            />
          </div>
        </EnvironmentColumn>
      </div>

      {/* IN SYNC banner */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${syncScale})`,
        backgroundColor: 'rgba(74, 255, 158, 0.15)',
        border: '3px solid #4aff9e',
        borderRadius: 16,
        padding: '20px 50px',
        boxShadow: `0 0 ${syncPulse * 40}px ${syncPulse * 15}px rgba(74, 255, 158, ${syncPulse * 0.5})`,
        zIndex: 10,
      }}>
        <span style={{ color: '#4aff9e', fontSize: 36, fontWeight: 'bold' }}>
          ✅ IN SYNC — All Done! 🎉
        </span>
      </div>

      <NarrationBar text="DEV and PROD are identical again — existing data preserved with NULL for new column! 🎉" />
    </AbsoluteFill>
  );
};
