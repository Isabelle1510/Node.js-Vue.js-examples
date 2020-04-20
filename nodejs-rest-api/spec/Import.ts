import {supertest} from 'supertest';
import * as app from '../src/index';
import * as chai from 'chai';

describe('An import', () => {
  let validImport;

  beforeEach(() => {
    validImport = {
      bookId: '1234',
      type: 'pdf',
      url: 'www.something.com'
    };
  });

  describe('when creating an import', () => {
    it('should return no errors when the import is valid', async () => {
      supertest(app).post('imports/').send(validImport).expect(200);
    });

    it('should throw an error when the bookId is missing', async () => {
      delete validImport.bookId;

      supertest(app).post('imports/').send(validImport).expect(400);
    });
  });
});
