let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

// Assertion Style
var expect = chai.expect;

chai.use(chaiHttp);

describe("POST /signup", () => {
    it("It should return a message", (done) => {
        const req = {
            username: "userFOUR",
            password: "44444444",
            email: "b08000004@gmail.com"
        };
        chai.request(server).post("/signup").send(req)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.be.a('string');
                expect(res.text).to.equal("Sign up successfully.");
            done();
            });
    });
});