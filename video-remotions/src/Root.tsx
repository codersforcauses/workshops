import React from 'react';
import { Composition } from 'remotion';
import { MigrationExplainer } from './MigrationExplainer';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MigrationExplainer"
        component={MigrationExplainer}
        durationInFrames={2910}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
