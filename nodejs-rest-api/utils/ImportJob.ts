import {Type, Options, validate} from 'validate-typescript';
import {JobType} from '../types/JobType';
import {State} from '../types/State';
import {MockDatabase} from './MockDatabase';
import {Import} from '../interfaces/Import';

export class ImportJob {
  public constructor(private readonly database: MockDatabase) {
  }

  public get(res: any): void {
    res.send(this.database.getImportJobs());
  }

  public post(req: any, res: any): void {
    const schema = {
      bookId: Type(String),
      type: Options([JobType.Word, JobType.PDF, JobType.WattPad, JobType.Evernote]),
      url: Type(String)
    };

    try {
      validate(schema, req.body);
    } catch (error) {
      res.sendStatus(400);

      throw new Error('Import object is not valid');
    }

    const importObject: Import = req.body;
    importObject.state = State.Pending;
    importObject.createdAt = Date.now();

    this.database.createImportJob(importObject);

    res.sendStatus(200);
  }
}
