import {JobType} from './JobType';

export const processingTimeMapping = {
  [JobType.EPub]: 10,
  [JobType.PDF]: 25,
  [JobType.Import]: 60
};
