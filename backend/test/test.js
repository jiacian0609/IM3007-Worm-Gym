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
                    res.body.should.be.a('object');
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
        "equip_id": 7,
        "weight": "20 kg",
        "reps": "20 下",
        "sets": "3 組",
        "date": "2022-03-05",
        "day": "free"
    };

    const req2 = {
        "equip_id": 8,
        "weight": "20 kg",
        "reps": "8 下",
        "sets": "3 組",
        "date": "2022-04-08",
        "day": 1
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

    let token = undefined;
    describe("Case 1: day = free", () => {
        it("Return a message", (done) => {
            // login to get token
            chai.request(server)
                .post('/login').send({username: 'userONE', password: '11111111'})
                .end((err, res1) => {
                    // token
                    token = res1.body.JWT;

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
});


// finish-rate api
describe("GET /finish-rate", () => {
    let rates = undefined;
    it("Return an array", (done) => {
        // login to get token
        chai.request(server)
        .post('/login').send({username: 'userONE', password: '11111111'})
        .end((err, res1) => {
            // token
            const token = res1.body.JWT;

            chai.request(server)
                .get('/finish-rate')
                .set({'Authorization': token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body.length).equal(3);

                    rates = res.body;
                    done();
                });
        });
    });

    it("Contain year, month, and finish_rate property", (done) => {
        for (let i = 0; i < rates.length; i++) {
            rates[i].should.be.a('object');
            rates[i].should.have.property('year');
            rates[i].should.have.property('month');
            rates[i].should.have.property('finish_rate');
            expect(rates[i].year).to.equal('2022');
        }
        expect(rates[0].month).to.equal('03');
        expect(rates[1].month).to.equal('04');
        expect(rates[2].month).to.equal('05');
        expect(rates[0].finish_rate).to.equal('93.75%');
        expect(rates[1].finish_rate).to.equal('75%');
        expect(rates[2].finish_rate).to.equal('58.33%');
        done();
    });
});


// inbody_record api
describe("GET /inbody_record", () => {
    let inbody = undefined;
    it("Return an array", (done) => {
        // login to get token
        chai.request(server)
        .post('/login').send({username: 'userONE', password: '11111111'})
        .end((err, res1) => {
            // token
            const token = res1.body.JWT;

            chai.request(server)
                .get('/inbody_record')
                .set({'Authorization': token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body.length).equal(1);

                    inbody = res.body;
                    done();
                });
        });
    });

    it("Contain the newest inbody record", (done) => {
        for (let i = 0; i < inbody.length; i++) {
            inbody[i].should.be.a('object');
            inbody[i].should.have.property('user_id');
            inbody[i].should.have.property('date');
            inbody[i].should.have.property('weight_kg');
            inbody[i].should.have.property('SMM_kg');
            inbody[i].should.have.property('BFM_kg');
            inbody[i].should.have.property('PBF_pct');
            inbody[i].should.have.property('LHM_kg');
            inbody[i].should.have.property('RHM_kg');
            inbody[i].should.have.property('BM_kg');
            inbody[i].should.have.property('LLM_kg');
            inbody[i].should.have.property('RLM_kg');
            inbody[i].should.have.property('LHF_kg');
            inbody[i].should.have.property('RHF_kg');
            inbody[i].should.have.property('BF_kg');
            inbody[i].should.have.property('LLF_kg');
            inbody[i].should.have.property('RLF_kg');
            inbody[i].should.have.property('BMR_kcal');
            inbody[i].should.have.property('inbody_id');
        }
        expect(inbody[0].user_id).to.equal(1);
        expect(inbody[0].date).to.equal("2021-04-14T16:00:00.000Z");
        expect(inbody[0].weight_kg).to.equal(59.1);
        expect(inbody[0].SMM_kg).to.equal(19.6);
        expect(inbody[0].BFM_kg).to.equal(21.8);
        expect(inbody[0].PBF_pct).to.equal(36.9);
        expect(inbody[0].LHM_kg).to.equal(1.94);
        expect(inbody[0].RHM_kg).to.equal(2.02);
        expect(inbody[0].BM_kg).to.equal(17.7);
        expect(inbody[0].LLM_kg).to.equal(5.02);
        expect(inbody[0].RLM_kg).to.equal(5.2);
        expect(inbody[0].LHF_kg).to.equal(1.6);
        expect(inbody[0].RHF_kg).to.equal(1.5);
        expect(inbody[0].BF_kg).to.equal(11.7);
        expect(inbody[0].LLF_kg).to.equal(2.9);
        expect(inbody[0].RLF_kg).to.equal(2.9);
        expect(inbody[0].BMR_kcal).to.equal(1176);
        expect(inbody[0].inbody_id).to.equal(10);
        done();
    });
});


// menu api
describe("GET /menu/:date", () => {
    let token = undefined;
    describe("Case 1: yyyy-mm format", () => {
        let menu = undefined;
        it("Return an array", (done) => {
            // login to get token
            chai.request(server)
            .post('/login').send({username: 'userONE', password: '11111111'})
            .end((err, res1) => {
                // token
                token = res1.body.JWT;
                
                chai.request(server)
                    .get('/menu/2022-03')
                    .set({'Authorization': token})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        expect(res.body.length).equal(12);

                        menu = res.body;
                        done();
                    });
            });
        });

        it("Contain the first menu of the month", (done) => {
            for (let i = 0; i < menu.length; i++) {
                menu[i].should.be.a('object');
                menu[i].should.have.property('user_id');
                menu[i].should.have.property('Day');
                menu[i].should.have.property('equip_id');
                menu[i].should.have.property('sets');
                menu[i].should.have.property('finish');
                menu[i].should.have.property('program_id');
                menu[i].should.have.property('date');
                menu[i].should.have.property('reps');
                expect(menu[i].user_id).to.equal(1);
                expect(menu[i].finish).to.equal(true);
                expect(menu[i].program_id).to.equal(632 + i);
                expect(menu[i].date).to.equal("2022-03-01T08:00:00.000Z");
            }
            done();
        });
    });
    
    describe("Case 2: yyyy-mm-dd format", () => {
        let menu = undefined;
        it("Return an array", (done) => {                
            chai.request(server)
                .get('/menu/2022-05-22')
                .set({'Authorization': token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    expect(res.body.length).equal(12);

                    menu = res.body;
                    done();
                });
        });

        it("Contain the menu of the given start date", (done) => {
            for (let i = 0; i < menu.length; i++) {
                menu[i].should.be.a('object');
                menu[i].should.have.property('user_id');
                menu[i].should.have.property('Day');
                menu[i].should.have.property('equip_id');
                menu[i].should.have.property('sets');
                menu[i].should.have.property('finish');
                menu[i].should.have.property('program_id');
                menu[i].should.have.property('date');
                menu[i].should.have.property('reps');
                expect(menu[i].user_id).to.equal(1);
                expect(menu[i].program_id).to.equal(764 + i);
                expect(menu[i].date).to.equal("2022-05-22T08:00:00.000Z");

                if (i == 10 || i == 11) {
                    expect(menu[i].finish).to.equal(false);
                } else {
                    expect(menu[i].finish).to.equal(true);
                }
            }
            done();
        });
    });
});


// getRecord api
const months = {
	Jan: '01',
	Feb: '02',
	Mar: '03',
	Apr: '04',
	May: '05',
	Jun: '06',
	Jul: '07',
	Aug: '08',
	Sep: '09',
	Oct: '10',
	Nov: '11',
	Dec: '12',
}

function convertTZ(date, tzString) {
    return (new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}))).toString();   
}

function nowDate() {
	const now = convertTZ(new Date(), "Asia/Jakarta")
	var year = now.toString().split(" ")[3]
	var month = months[now.toString().split(" ")[1]]
	var date = now.toString().split(" ")[2]
	return (year + '-' + month + '-' + date)
}

describe("GET /getRecord/:date", () => {
    describe("Case 1: date of today", () => {
        let response = undefined;
        it("Return an object", (done) => {
            // login to get token
            chai.request(server)
            .post('/login').send({username: 'userONE', password: '11111111'})
            .end((err, res1) => {
                // token
                const token = res1.body.JWT;

                chai.request(server)
                    .get('/getRecord/' + nowDate())
                    .set({'Authorization': token})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');

                        response = res.body;
                        done();
                    });
            });
        });

        it("Contain day property", (done) => {
            response.should.have.property('day');
            expect(response.day).to.equal('free');
            done();
        });

        it("Contain records of each equipment", (done) => {
            response.should.have.property('records');
            expect(response.records.length).to.equal(20);
            for (let i = 0; i < 20; i++) {
                expect(response.records[i].weight).to.equal(0);
                expect(response.records[i].sets).to.equal(0);
                expect(response.records[i].reps).to.equal(0);
                expect(response.records[i].status).to.equal('optional');
            }
            done();
        });
    });

    describe("Case 2: date of a previos day", () => {
        let response = undefined;
        it("Return an object", (done) => {
            // login to get token
            chai.request(server)
            .post('/login').send({username: 'userONE', password: '11111111'})
            .end((err, res1) => {
                // token
                const token = res1.body.JWT;

                chai.request(server)
                    .get('/getRecord/2022-03-01')
                    .set({'Authorization': token})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');

                        response = res.body;
                        done();
                    });
            });
        });

        it("Contain day property", (done) => {
            response.should.have.property('day');
            expect(response.day).to.equal('1');
            done();
        });

        it("Contain previous records & status", (done) => {
            response.should.have.property('records');
            expect(response.records.length).to.equal(20);
            const finish_id = [3, 8, 14, 5, 15, 7];
            for (let i = 0; i < 20; i++) {
                if (finish_id.indexOf(response.records[i].equip_id) !== -1) {
                    expect(response.records[i].status).to.equal('finished');
                } else {
                    expect(response.records[i].weight).to.equal(0);
                    expect(response.records[i].sets).to.equal(0);
                    expect(response.records[i].reps).to.equal(0);
                    expect(response.records[i].status).to.equal('optional');
                }
            }
            expect(response.records[2].weight).to.equal('X');
            expect(response.records[2].sets).to.equal('1 組');
            expect(response.records[2].reps).to.equal('20 分鐘');
            expect(response.records[4].weight).to.equal('15 kg');
            expect(response.records[4].sets).to.equal('3 組');
            expect(response.records[4].reps).to.equal('8 下');
            expect(response.records[6].weight).to.equal('20 kg');
            expect(response.records[6].sets).to.equal('3 組');
            expect(response.records[6].reps).to.equal('20 下');
            expect(response.records[7].weight).to.equal('20 kg');
            expect(response.records[7].sets).to.equal('3 組');
            expect(response.records[7].reps).to.equal('8 下');
            expect(response.records[13].weight).to.equal('40 kg');
            expect(response.records[13].sets).to.equal('3 組');
            expect(response.records[13].reps).to.equal('8 下');
            expect(response.records[14].weight).to.equal('15 kg');
            expect(response.records[14].sets).to.equal('3 組');
            expect(response.records[14].reps).to.equal('8 下');
            done();
        });
    });
});