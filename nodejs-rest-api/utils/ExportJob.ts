import {Type, Options, validate} from 'validate-typescript';
import {JobType} from '../types/JobType';
import {State} from '../types/State';
import {MockDatabase} from './MockDatabase';
import {Export} from '../interfaces/Export';

export class ExportJob {
  public constructor(private readonly database: MockDatabase) {
  }

  public get(res: any): void {
    res.send(this.database.getExportJobs());
  }

  public post(req: any, res: any): void {
    const schema = {
      bookId: Type(String),
      type: Options([JobType.EPub, JobType.PDF])
    };

    try {
      validate(schema, req.body);
    } catch (error) {
      res.sendStatus(400);

      throw new Error('Export object is not valid');
    }

    const exportObject: Export = req.body;
    exportObject.state = State.Pending;
    exportObject.createdAt = Date.now();

    this.database.createExportJob(exportObject);

    res.sendStatus(200);
  }
}
