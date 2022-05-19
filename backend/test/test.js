process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');
const pool = require('../db');

chai.use(chaiHttp);


// signup api
describe("POST /signup", () => {
    const req = {
        username: "userFOUR",
        password: "44444444",
        email: "b08000004@gmail.com"
    };

    let beforneCnt = -1;
    before(async () => {
        // run before all tests in this describe block
        const before_user = await pool.query(`
            SELECT * FROM "WormGym".user_info
            WHERE username = $1 AND password = $2 AND email = $3`,
            [req.username, req.password, req.email]);
        beforneCnt = before_user.rowCount;
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
        expect(user.rowCount - beforneCnt).to.equal(1);
    });

    after(async () => {
        // run after all tests in this describe block
        await pool.query(`
            DELETE FROM "WormGym".user_info
            WHERE username = $1 AND password = $2 AND email = $3`,
            [req.username, req.password, req.email]);
    });
});


// login api
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
                    done();
                });
        });
    });
});


// logout api
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


// record api
describe("POST /record", () => {
    const req1 = {
        equip_id: 7,
        weight: 20,
        reps: "20 下",
        sets: 3,
        date: "2022-03-05",
        day: "free"
    };

    const req2 = {
        equip_id: 3,
        weight: 0,
        reps: '20 分鐘',
        sets: 1,
        date: '2022-04-08',
        day: 1
    };

    let before_r1Cnt = -1;
    let before_r2Cnt = -1
    before(async () => {
        // run before all tests in this describe block
        const before_r1 = await pool.query(`
            SELECT * FROM "WormGym".fitness_record
            WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
            [req1.equip_id, req1.weight, req1.reps, req1.sets, req1.date, req1.day]);
        before_r1Cnt = before_r1.rowCount;

        const before_r2 = await pool.query(`
            SELECT * FROM "WormGym".fitness_record
            WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
            [req2.equip_id, req2.weight, req2.reps, req2.sets, req2.date, req2.day]);
        before_r2Cnt = before_r2.rowCount;
    });

    after(async () => {
        // run after all tests in this describe block
        await pool.query(`
            DELETE FROM "WormGym".fitness_record
            WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
            [req1.equip_id, req1.weight, req1.reps, req1.sets, req1.date, req1.day]);

        await pool.query(`
            DELETE FROM "WormGym".fitness_record
            WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
            [req2.equip_id, req2.weight, req2.reps, req2.sets, req2.date, req2.day]);
        
        await pool.query(`
            UPDATE "WormGym".fitness_program SET finish=false
            WHERE equip_id = $1 AND date = $2 AND "Day" = $3`,
            [req2.equip_id, req2.date, req2.day]);
    });

    describe("Case 1: day = free", () => {
        it("Return a message", (done) => {
            // login to get token
            chai.request(server)
                .post('/login').send({username: 'userONE', password: '11111111'})
                .end((err, res1) => {
                    // token
                    const token = res1.body.JWT;

                    chai.request(server)
                        .post('/record')
                        .send(req1)
                        .set({'Authorization': token})
                        .end((err, res) => {
                            res.should.have.status(200);
                            expect(res.text).to.equal('Success');
                            done();
                        });
                });
        });

        it("Store information into database", async () => {
            const r = await pool.query(`
                SELECT * FROM "WormGym".fitness_record
                WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
                [req1.equip_id, req1.weight, req1.reps, req1.sets, req1.date, req1.day]);
            expect(r.rowCount - before_r1Cnt).to.equal(1);
        });
    });

    describe("Case 2: day ≠ free", () => {
        it("Return a message", (done) => {
            // login to get token
            chai.request(server)
                .post('/login').send({username: 'userONE', password: '11111111'})
                .end((err, res1) => {
                    // token
                    const token = res1.body.JWT;

                    chai.request(server)
                        .post('/record')
                        .send(req2)
                        .set({'Authorization': token})
                        .end((err, res) => {
                            res.should.have.status(200);
                            expect(res.text).to.equal('Success');
                            done();
                        });
                });
        });

        it("Store information into database", async () => {
            const r = await pool.query(`
                SELECT * FROM "WormGym".fitness_record
                WHERE equip_id = $1 AND weight = $2 AND reps = $3 AND sets = $4 AND date = $5 AND "Day" = $6`,
                [req2.equip_id, req2.weight, req2.reps, req2.sets, req2.date, req2.day]);
            expect(r.rowCount - before_r2Cnt).to.equal(1);
        });

        it("Update finish satus", async () => {
            const p = await pool.query(`
                SELECT finish FROM "WormGym".fitness_program
                WHERE equip_id = $1 AND date = $2 AND "Day" = $3`,
                [req2.equip_id, req2.date, req2.day]
            );
            expect(p.rows[0].finish).to.equal(true);
        });
    });
});

