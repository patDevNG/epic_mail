import chai from 'chai';
import chaiHttp from 'chai-http'
import server from '../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Testing the Auth Route',()=>{
    describe('Test the Signup Endpoint', ()=>{
        it('Should create a new user', async () => {
        const res = await chai.request(server).post('/api/v1/auth/signup/').type('form').send({
            
            "firstName":"Pat",
	"lastName":"Okuns",
	"country":"nigeria",
	"email":" jus@123.com",
	"dateOfBirth":"123",
	"gender":"Male",
	"email":"e@b.com",
	"password":"123"
        });
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message');
        
        });
    });
    describe('Test the Signup Endpoint', ()=>{
        it('Should return an error for a user that already exit', async () => {
        const res = await chai.request(server).post('/api/v1/auth/signup/').type('form').send({
            
            "firstName":"Pat",
	"lastName":"Okuns",
	"country":"nigeria",
	"email":" jus@123.com",
	"dateOfBirth":"123",
	"gender":"Male",
	"email":"e@b.com",
	"password":"123"
        });
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.have.property('message');
        
        });
    });
});
