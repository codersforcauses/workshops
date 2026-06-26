import React from 'react';
import { Sequence } from 'remotion';
import { STEP_DURATIONS, STEP_OFFSETS } from './data/states';

import { Step1_InitialState } from './steps/Step1_InitialState';
import { Step2_MakeMigrations } from './steps/Step2_MakeMigrations';
import { Step3_Migrate } from './steps/Step3_Migrate';
import { Step4_DeployProd } from './steps/Step4_DeployProd';
import { Step5_ProdMigrate } from './steps/Step5_ProdMigrate';
import { Step6_AddField } from './steps/Step6_AddField';
import { Step7_MakeMigrations2 } from './steps/Step7_MakeMigrations2';
import { Step8_Migrate2 } from './steps/Step8_Migrate2';
import { Step9_DeployProd2 } from './steps/Step9_DeployProd2';
import { Step10_ProdMigrate2 } from './steps/Step10_ProdMigrate2';

const STEPS = [
  Step1_InitialState,
  Step2_MakeMigrations,
  Step3_Migrate,
  Step4_DeployProd,
  Step5_ProdMigrate,
  Step6_AddField,
  Step7_MakeMigrations2,
  Step8_Migrate2,
  Step9_DeployProd2,
  Step10_ProdMigrate2,
];

export const MigrationExplainer: React.FC = () => {
  return (
    <>
      {STEPS.map((StepComponent, i) => (
        <Sequence
          key={i}
          from={STEP_OFFSETS[i]}
          durationInFrames={STEP_DURATIONS[i]}
        >
          <StepComponent />
        </Sequence>
      ))}
    </>
  );
};
