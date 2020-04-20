import {Import} from '../interfaces/Import';
import {Export} from '../interfaces/Export';
import {State} from '../types/State';
import {JobType} from '../types/JobType';
import * as uuidv4 from 'uuid/v4';
import {processingTimeMapping} from '../types/processingTimeMapping';

export class MockDatabase {
  private static importJobs: Import[];
  private static exportJobs: Export[];

  public constructor() {
    if (!MockDatabase.importJobs) {
      MockDatabase.importJobs = [];
    }

    if (!MockDatabase.exportJobs) {
      MockDatabase.exportJobs = [];
    }
  }

  public getImportJobs(): Import[] {
    return MockDatabase.importJobs.sort((a: Import, b: Import) => a.state.localeCompare(b.state));
  }

  public getExportJobs(): Export[] {
    return MockDatabase.exportJobs.sort((a: Export, b: Export) => a.state.localeCompare(b.state));
  }

  public createImportJob(importJob: Import): void {
    importJob.id = uuidv4();
    MockDatabase.importJobs.push(importJob);

    setTimeout(() => {
      importJob.state = State.Finished;
      importJob.updatedAt = Date.now();
    }, processingTimeMapping[JobType.Import] * 1000);

    MockDatabase.importJobs.forEach((importInArray, i) => {
      if (importInArray.id === importJob.id) {
        MockDatabase.importJobs[i] = importJob;
      }
    });
  }

  public createExportJob(exportJob: Export): void {
    exportJob.id = uuidv4();
    MockDatabase.exportJobs.push(exportJob);

    setTimeout(() => {
      exportJob.state = State.Finished;
      exportJob.updatedAt = Date.now();
    }, processingTimeMapping[exportJob.type] * 1000);

    MockDatabase.exportJobs.forEach((exportInArray, i) => {
      if (exportInArray.id === exportJob.id) {
        MockDatabase.exportJobs[i] = exportJob;
      }
    });
  }
}
