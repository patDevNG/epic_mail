import db from '../config/db';
import queries from '../config/queries'
import schema from '../model/schema';

export default class MessageController {
    static async sendMessage(req, res) {
        try{
            const messageData = {};
             messageData.subject = req.body.subject;
             messageData.subject = req.body.subject; 
            messageData.message = req.body.message;
            messageData.parentmessageId = req.body.parentmessageId;
            messageData.status = req.body.status;
            messageData.recieversEmail = req.body.recieversEmail;
            messageData.sendersEmail = req.body.sendersEmail;
            messageData.createdOn = Date.now();
            console.log(messageData);
      
            

            const {rows, rowCount} = await db.query(
                queries.checkIfUserExist,
                [messageData.recieversEmail]
            );
            if (rowCount === 0) {
                return res
                    .status(401)
                    .json({'status': 401, 'error': 'Email is invalid'})
            } else if (messageData.sendersEmail && messageData.recieversEmail) {
                messageData.status = 'sent';
                const messageTableValue = [
                    messageData.subject,
                    messageData.message,
                    messageData.parentmessageId,
                    messageData.status,
                    messageData.sendersEmail
                ]
                
                const insertMessage = await db.query(queries.sendMessages,messageTableValue);
                console.log(insertMessage);
                
                if (insertMessage.rowCount === 1) {
                   
                    const inboxTableValue = [insertMessage.rows[0].id,messageData.recieversEmail,'unread']
                    const populateInbox = await db.query(queries.populateInbox,inboxTableValue);
                    const data ={
                        subject:messageData.subject,
                        message:messageData.message,
                        parentmessageId:messageData.parentmessageId,
                        createdOn:messageData.createdOn,
                        status:messageData.status
                    }
                    return res.status(201).json({'status': 201, data})
                } else {
                
                        return res
                            .status(201)
                            .json({'status': 201, 'message': 'message saved as draft'})
                    
                }
            }
        }catch(e){
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',e);

        }

        }

 
}
