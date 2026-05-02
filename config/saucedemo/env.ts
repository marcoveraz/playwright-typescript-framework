import { devConfig } from './environments/dev';
import { qaConfig } from './environments/qa';
import { stageConfig } from './environments/stage';

type Env = 'dev' | 'qa' | 'stage' | 'prod';
const env = (process.env.ENV || 'dev').toLowerCase() as Env;

const configMap = {
  dev: devConfig,
  qa: qaConfig,
  stage: stageConfig,
  prod: stageConfig,
};

export const currentEnv = configMap[env];
