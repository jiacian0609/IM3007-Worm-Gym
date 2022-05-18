process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const pool = require('../db');

chai.use(chaiHttp);


describe("POST /signup", () => {
    const req = {
        username: "userFOUR",
        password: "44444444",
        email: "b08000004@gmail.com"
    };

    after(async () => {
        // run after all tests in this describe block
        await pool.query(`
            DELETE FROM "WormGym".user_info
            WHERE username = $1 AND password = $2 AND email = $3`,
            [req.username, req.password, req.email]);
    });

    it("Should return a message", (done) => {
        chai.request(server).post("/signup").send(req)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.equal("Sign up successfully.");
            done();
            });
    });

    it("Should store information into database", async () => {
        const user = await pool.query(`
            SELECT * FROM "WormGym".user_info 
            WHERE username = $1 AND password = $2 AND email = $3`,
            [req.username, req.password, req.email]);
        expect(user.rowCount).to.greaterThan(0);
    });
});