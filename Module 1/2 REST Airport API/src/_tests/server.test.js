const app = require("../server"); // Link to your server file
const request = require("supertest");

describe('Server.js', () => {
  describe("GET /docs", function () {
    it('returns a 200 status code', (done) => {
      request(app)
        .get('/docs/')
        .expect(200)
        .end(done)
    });
    it("responds with HTML", function (done) {
      request(app)
        .get("/docs/")
        .set("Accept", "text/html")
        .expect("Content-Type", "text/html; charset=utf-8")
        .end(done)
    });
  });
  describe('GET /airports', () => {
    it('returns a 200 status code', (done) => {
      request(app)
        .get('/airports')
        .expect(200)
        .end(done)
    });
    it('returns a JSON response', (done) => {
      request(app)
        .get('/airports')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end(done)
    });
    it('array contains at least 10 objects', (done) => {
      request(app)
        .get('/airports')
        .set('Accept', 'application/json')
        .expect(resp => expect(resp.body.length).toBeGreaterThan(10))
        .end(done)
    });
  });
  describe('GET /airport/:icao', () => {
    import saveFile from './utils/saveFile.js'
    beforeEach(() => {
      
    });
    it('returns a 200 staus code', () => {

    });
  });
});
