import * as express from 'express';
import * as bodyParser from 'body-parser';
import {ImportJob} from '../utils/ImportJob';
import {ExportJob} from '../utils/ExportJob';
import {MockDatabase} from '../utils/MockDatabase';

const app = express();
app.use(bodyParser.json());

const port = 8000;

const database = new MockDatabase();
const fileImport = new ImportJob(database);
const fileExport = new ExportJob(database);

app.get('/imports', (req, res) => {
  fileImport.get(res);
});

app.post('/imports', (req, res) => {
  fileImport.post(req, res);
});

app.get('/exports', (req, res) => {
  fileExport.get(res);
});

app.post('/exports', (req, res) => {
  fileExport.post(req, res);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started on port`, port);
});
