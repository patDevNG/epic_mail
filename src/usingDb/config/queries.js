const queries={};
queries.insertUsers ='INSERT INTO users(firstName,lastName,country,phoneNumber,gender,email,password) VALUES($1,$2,$3,$4,$5,$6,$7)'
queries.checkIfUserExist ='SELECT * FROM users where email = $1'
queries.sendMessages = 'INSERT INTO messages(createdOn,subject,message,parentmessageId,status) VALUES ($1,$2,$3,$4,$5)';
queries.inbox = 'INSERT INTO inbox(messageId,createdOn,recieversEmail) VALUES ($1,$2,$3)';
queries.sent = 'INSERT INTO sent (messageID,createdOn,sendersEmail) VALUES($1,$2,$3)';
queries.sendMessages = 'INSERT INTO messages(subject,message,parentMessageId,sendersEmail,status) VALUES($1,$2,$3,$4,$5) RETURNING id';
queries.populateInbox ='INSERT INTO inbox(messageId,receiversEmail,status) VALUES ($1,$2,$3)';
queries.checkIfGroupExist = 'SELECT * FROM groups where name = $1'
queries.createGroup ='INSERT INTO groups(name,createdon,creator) VALUES ($1,$2,$3)';
queries.getAllGroupInfo ='SELECT * FROM groups';



export default queries