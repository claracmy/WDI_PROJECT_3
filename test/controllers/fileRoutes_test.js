/* globals api, expect, describe, beforeEach, afterEach, it */

require('spec_helper.js');

const File = require('../../models/file');
let file;

describe('Files controlers test', allFileTests);

function allFileTests(){
  beforeEach(removeCollection);
  afterEach(removeCollection);
  describe('GET api/file', indexTest);
  describe('Should make more then pne file', ManyFilesTest);
  describe('POST api/file', postFileTest);
  describe('GET api/file/:id', showFileTest);
  describe('UPDATE api/file/:id', updateFileTest);
  describe('DELETE api/file/:id', deleteFileTest);
}

function removeCollection(done){
  File.collection.remove();
  done();
}

function indexTest(){
  beforeEach(filesCreate);
  it('it should return a 200 response', twoHundredTest);
  it('it should respond with a JSON object', jsonObjectTest);
  it('it should return an array', arrayTest);
  it('it should return an array of objects', arrayOfObjectsTest);
  it('the files should match the schema params: filename, text, createdBy', paramsTest);
}

function ManyFilesTest(){
  beforeEach(manyFilesCreate);
  it('it should return more than one file', returnFilesTest);
}

function postFileTest(){
  it('it should return a 201', postResponseTest);
  it('file objects should have properities: filename, text, createdBy, createdAt, id, updatedAt', expectFileTest);
}

function showFileTest(){
  beforeEach(filesCreateId);
  it('it should return a 200', twoHundredIdTest);
}

function updateFileTest(){
  beforeEach(filesCreateId);
  it('it should return a 200 response', twoHundredUpdatedTest);
  it('it should respond with a JSON object', jsonObjectIdTest);
  it('should update file object' , isFileUpdatedTest);
  it('should return a book object', filesObjectsId);
  it('book objects should have properities: id, filename, text, createdBy, createdAt, updatedAt', expectFileIdTest);
}

function deleteFileTest(){
  beforeEach(filesCreateId);
  it('it should return a 200', deleteTest);
}

//index test functions----------------------------------------------------------

function filesCreate(done){
  File.create([{
    filename: 'i am the best!',
    test: 'yes',
    createdBy: 'john smith'
  }])
    .then(() => done())
    .catch(done);
}

function twoHundredTest(done){
  api
    .get('api/files')
    .set('Accept', 'application/json')
    .expext(200, done);
}

function jsonObjectTest(done){
  api
    .get('api/files')
    .get('Accept', 'application/json')
    .end((err, res) => {
      expect(res.header['content-type'])
        .to.be.eq('application/json; charset=utf-8');
      done();
    });
}

function arrayTest(done){
  api
    .get('/api/files')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body).to.be.an('array');
      done();
    });
}

function arrayOfObjectsTest(done){
  api
    .get('/api/files')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body)
        .and.be.an('array')
        .and.have.property(0)
        .and.have.all.keys([
          'filename',
          'createdBy',
          'text',
          'createdAt',
          'id',
          'updatedAt'
        ]);
      done();
    });
}

function paramsTest(done){
  api
    .get('api/files')
    .set('Accept', 'application/json')
    .end((err, res) => {
      const firstFileInArray = res.body[0];

      expect(firstFileInArray)
        .to.have.property('id')
        .and.to.be.a('string');

      expect(firstFileInArray)
        .to.have.property('filename')
        .and.to.be.a('string');

      expect(firstFileInArray)
        .to.have.property('createdBy')
        .and.to.be.a('string');

      expect(firstFileInArray)
        .to.have.property('text')
        .and.to.be.a('string');

      expect(firstFileInArray)
        .to.have.property('crestedAt')
        .and.to.be.a('string');

      expect(firstFileInArray)
        .to.have.property('updatedAt')
        .and.to.be.a('string');

      done();
    });
}

function manyFilesCreate(done){
  File.create([
    {
      filename: 'my work',
      createdBy: 'john smith',
      text: 'this is text'
    },
    {
      filename: 'my work2',
      createdBy: 'john smith2',
      text: 'this is text2'
    }
  ])
    .then(() => done())
    .catch(done);
}

function returnFilesTest(done){
  api
    .get('api/files')
    .set('Accept', 'application/json')
    .end((err, res) => {
      expect(res.body.length).to.equal(2);
      done();
    });
}

function postResponseTest(done){
  api
    .get('api/files')
    .set('Accept', 'application/json')
    .send({
      file: {
        filename: 'file name',
        createdBy: 'john smith',
        text: 'this is text'
      }
    })
    .expect(201, done);
}

function expectFileTest(done) {
  api
    .post('/api/files')
    .set('Accept', 'application/json')
    .send({
      file: {
        filename: 'the file name',
        createdBy: 'A. Smith',
        text: 'this is the file text'
      }
    })
    .end((err, res) => {
      const file = res.body;
      expect(file)
        .to.have.property('id')
        .and.to.be.a('string');

      expect(file)
        .to.have.property('filename')
        .and.to.be.a('string');

      expect(file)
        .to.have.property('createdBy')
        .and.to.be.a('string');

      expect(file)
        .to.have.property('text')
        .and.to.be.a('string');

      expect(file)
        .to.have.property('createdAt')
        .and.to.be.a('string');

      expect(file)
        .to.have.property('updatedAt')
        .and.to.be.a('string');

      done();
    });
}

function filesCreateId(done) {
  File.create({
    filename: 'The file name',
    createdBy: 'jen Tzu',
    text: 'this is text'
  })
    .then((fileData) => {
      file = fileData;
      done();
    })
    .catch(done);
}

//should return a 200 response
function twoHundredIdTest(done) {
  api
    .get(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .expect(200, done);
}

// TEST FOR UPDATE -------------------------------------------------------------

// should return a 200 response
function twoHundredUpdatedTest(done) {
  api
    .put(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .send({
      filename: 'The file name',
      createdBy: 'john smith',
      text: 'this is text'
    })
    .expect(200, done);
}

//should respond with a JSON object
function jsonObjectIdTest(done) {
  api
    .put(`/api/books/${file.id}`)
    .set('Accept', 'application/json')
    .send({
      filename: 'The name of file',
      createdBy: 'Sun house',
      text: 'text'
    })
    .end((err, res) => {
      expect(res.header['content-type'])
        .to.be.eq('application/json; charset=utf-8');
      done();
    });
}

//should update book object
function isFileUpdatedTest(done) {
  api
    .put(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .send({
      filename: 'The art',
      createdBy: 'Sun',
      text: 'this is text'
    })
    .end((err, res) => {
      expect(res.body.filename).to.eq('The art');
      expect(res.body.createdBy).to.eq('Sun');
      expect(res.body.text).to.eq('this is text');
      done();
    });
}

//should return an array of book objects
function filesObjectsId(done){
  api.put(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .send({
      filename: 'The art of war',
      createdBy: 'Sun Tzu updated',
      text: 'this is text'
    })
    .end((err, res) => {
      expect(res.body)
        .and.have.all.keys([
          'filename',
          'createdBy',
          'createdAt',
          'text',
          'id',
          'updatedAt'
        ]);
      done();
    });
}

//book objects should have properities: id, book, author, createdAt, updatedAt
function expectFileIdTest(done){
  api.get(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .send({
      filename: 'The art of file names',
      createdBy: 'Sun Tzu updated',
      text: 'this is text'
    })
    .end((err, res) => {
      const firstFile = res.body;

      expect(firstFile)
        .to.have.property('id')
        .and.to.be.a('string');

      expect(firstFile)
        .to.have.property('filename')
        .and.to.be.a('string');

      expect(firstFile)
        .to.have.property('createdBy')
        .and.to.be.a('string');

      expect(firstFile){
        .to.have.property('text')
        .and.to.be.a('string');
      }

      expect(firstFile)
        .to.have.property('createdAt')
        .and.to.be.a('string');

      expect(firstFile)
        .to.have.property('updatedAt')
        .and.to.be.a('string');

      done();
    });
}

// TEST FOR DELETE -------------------------------------------------------------

// should return a 204 response
function deleteTest(done) {
  api
    .delete(`/api/files/${file.id}`)
    .set('Accept', 'application/json')
    .expect(204, done);
}
