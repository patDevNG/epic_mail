import db from '../config/db';
import queries from '../config/queries'
import schema from '../model/schema';

export default class MessageController {
    static async sendMessage(req, res) {
        try{
    const validateMessage = schema.message(req.body);
    if(validateMessage.error===null){
        const {receiversEmail, subject, message,} = req.body;
        const senderId = req.user.id;
        const evaluateEmail = await db.query(queries.checkIfUserExist,[receiversEmail])
        if(evaluateEmail.rowCount!==1){
        res.status(500).json({'status':500,'message':'Invalid Email'});
        }else{
           let receiversid = evaluateEmail.rows[0].id;
           const createdOn = moment(new Date());
           const messageToInsert =[subject,message,createdOn,'sent'];
           const populateMessageTable = await db.query(queries.sendMessages,messageToInsert);
           
           const messageId = populateMessageTable.rows[0].id;
           const sentMessageValues =[messageId,senderId];
           const inboxMessageValue =[messageId,receiversid,status];
           const insertSent = await db.query(queries.sent,sentMessageValues);
           const insertInbox = await db.query(queries.inbox,inboxMessageValue);
           res.status(201).json({
            status: 200,
            data: [{
              id: messageId, createdOn, subject, message, parentMessageId: null, status: 'sent',
            }]
        });
        }
    }else{
        res.status(401).json({'status':400, 'message':'Invalid Input'})
    }
    }catch{

    }
}
}  
