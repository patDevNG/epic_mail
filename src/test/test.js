// import chai from 'chai';
// import chaiHttp from 'chai-http'
// import server from '../app';
// import { doesNotReject } from 'assert';

// const expect = chai.expect;
// chai.use(chaiHttp);

// describe('Testing the Auth Route',()=>{
//     describe('Test the Signup Endpoint', ()=>{
//         it('Should create a new user', async () => {
//         const res = await chai.request(server).post('/api/v1/auth/signup/').type('form').send({
            
//             "firstName":"Pat",
// 	"lastName":"Okuns",
// 	"country":"nigeria",
// 	"phoneNumber":" jus@123.com",
// 	"dateOfBirth":"123",
// 	"gender":"Male",
// 	"email":"e@b.com",
// 	"password":"123"
//         });
//         chai.expect(res).to.have.status(201);
//         chai.expect(res.body).to.be.a('object');
//         chai.expect(res.body).to.have.property('token');
        
//         });
//     });
//     describe('Test the Signup Endpoint', ()=>{
//         it('Should return an error for a user that already exit', async () => {
//         const res = await chai.request(server).post('/api/v1/auth/signup/').type('form').send({
            
//             "firstName":"Pat",
// 	"lastName":"Okuns",
// 	"country":"nigeria",
// 	"email":" jus@123.com",
// 	"dateOfBirth":"123",
// 	"gender":"Male",
// 	"email":"e@b.com",
// 	"password":"123"
//         });
//         chai.expect(res).to.have.status(401);
//         chai.expect(res.body).to.have.property('message');
        
//         });
//     });
//     describe('Test the Login Endpoint', ()=>{
//         it('Should throw an error for an unregistered email', async () => {
//         const res = await chai.request(server).post('/api/v1/auth/login/').type('form').send({
//             "email":"e@a.com",
// 	"password":"123"
	
//         });
//         chai.expect(res).to.have.status(401);
//         chai.expect(res.body).to.have.property('message');
        
//         });
//     });
//     describe('Test the Login Endpoint', ()=>{
//         it('Should throw an error for an unregistered email', async () => {
//         const res = await chai.request(server).post('/api/v1/auth/login/').type('form').send({
//             "email":"e@b.com",
// 	"password":"123"
	
//         });
//         chai.expect(res).to.have.status(401);
//         chai.expect(res.body).to.have.property('message');
        
//         });
//     });
//     // describe('Test the Send Message Endpoint', ()=>{
//     //     it('Should not send mail when the email is not registered', async () => {
//     //     const res = await chai.request(server).post('/api/v1/messages').type('form').send({
//     //         "subject":"hi",
//     //         "message":"loremmmmmmdsajddvzD AD aDAGSDGA IGIKD gosDHGO",
//     //         "parentMessageId":"",
//     //         "status":"draft",
//     //         "recieversEmail":".com",
//     //         "sendersEmail":"ggg"
//     //     });
//     //     chai.expect(res).to.have.status(401);
//     //     chai.expect(res.body).to.have.prperty('message');
        
//     //     });
//     // });
//     // // describe('Test the Send Message Endpoint', ()=>{
//     //     it('Should send mail when the email is  registered',  (done) => {
//     //    chai.request(server).post('/api/v1/messages').type('form').send({
//     //         "subject":"hi",
//     //         "message":"loremmmmmmdsajddvzD AD aDAGSDGA IGIKD gosDHGO",
//     //         "parentMessageId":"",
//     //         "status":"draft",
//     //         "recieversEmail":"e@a.com",
//     //         "sendersEmail":"ggg"
//     //     }).end((err,res)=>{
//     //         chai.expect(res).to.have.status(401);
//     //         chai.expect(res).to.have.property('message');
//     //         done();
            
//     //     });
      
//     //     });
//     // });
// });

