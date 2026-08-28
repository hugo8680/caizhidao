import { coreEconomicsDepth } from './atlas-depth/core-economics';
import { householdPolicyGlobalDepth } from './atlas-depth/household-policy-global';
import { marketsBusinessDepth } from './atlas-depth/markets-business';
import type { AtlasDepthMap } from './atlas-depth/types';

export const atlasTopicDepth: AtlasDepthMap = {
  ...coreEconomicsDepth,
  ...marketsBusinessDepth,
  ...householdPolicyGlobalDepth,
};
