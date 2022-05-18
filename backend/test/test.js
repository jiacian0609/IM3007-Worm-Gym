process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const pool = require('../db');

chai.use(chaiHttp);

let jwtToken = "";

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

    it("Return a message", (done) => {
        chai.request(server).post("/signup").send(req)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.equal("Sign up successfully.");
                done();
            });
    });

    it("Store information into database", async () => {
        const user = await pool.query(`
            SELECT * FROM "WormGym".user_info 
            WHERE username = $1 AND password = $2 AND email = $3`,
            [req.username, req.password, req.email]);
        expect(user.rowCount).to.greaterThan(0);
    });
});

describe("POST /login", () => {
    describe("Case 1: username doesn't exist", () => {
        it("Return a message", (done) => {
            const req1 = {
                username: "username",
                password: "password"
            };
    
            chai.request(server).post('/login').send(req1)
                .end((err, res) => {
                    res.should.have.status(404);
                    expect(res.text).to.equal("Username does not exist.");
                    done();
                });
        });
    });
    
    describe("Case 2: wrong password", () => {
        it("Return a message", (done) => {
            const req2 = {
                username: "userONE",
                password: "password"
            };
    
            chai.request(server).post('/login').send(req2)
                .end((err, res) => {
                    res.should.have.status(403);
                    expect(res.text).to.equal("Password is wrong :(");
                    done();
                });
        });
    });
    
    describe("Case 3: successfully log in", () => {
        it("Return a message & JWT token", (done) => {
            const req3 = {
                username: "userONE",
                password: "11111111"
            };
    
            chai.request(server).post('/login').send(req3)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.to.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('JWT');
                    expect(res.body.message).to.equal('Login successfully.');

                    jwtToken = res.body.JWT;
                    done();
                });
        });
    });
});

describe("GET /logout", () => {
    it("Return a message", (done) => {
        chai.request(server).get('/logout')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).to.equal('Logout successfully.');
            done();
        });
    });
});
