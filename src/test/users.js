import chai from 'chai';
import chaiHttp from 'chai-http'
import server from '../app';

chai.use(chaiHttp);
describe('Testing the V2 endpoints',()=>{
  describe('SignUp Endpoint',()=>{
    it('Should ensure that user enteres a valid request', async () => {
        const res = await chai.request(server).post('/api/v2/auth/signup/').type('form').send({
            
            "firstName":"Pat",
	"lastName":"Okuns",
	"country":"nigeria",
	"phoneNumber":" jus@123.com",
	"dateOfBirth":"123",
	"gender":"Male",
	"email":"e@b.com",
	"password":"123"
        });
        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message');
        
        });
  })  
  describe('SignUp Endpoint',()=>{
    it('Should ensure that user enteres a valid request', async () => {
        const res = await chai.request(server).post('/api/v2/auth/signup/').type('form').send({
            
            "firstName": "patrick",
            "lastName": "Okuns",
            "country": "Nigeria",
            "phoneNumber": 1223445,
            "gender": "male",
            "email":"okuns.prck@epicmail.com",
            "password": "123"  
                 
        });
        chai.expect(res).to.have.status(201);
      
        chai.expect(res.body).to.have.property('token');
        
        });

    })
})