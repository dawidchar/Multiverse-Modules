import app from '../server'
import request from "supertest"

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
})

