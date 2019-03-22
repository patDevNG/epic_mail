import db from '../config/db';
import queries from '../config/queries'
import schema from '../model/schema';


export default class MessageController {
    static async sendMessage(req, res) {
        try {
            const validateMessage = schema.message(req.body);
            if (validateMessage.error === null) {
                const {receiversEmail, subject, message} = req.body;
                const senderId = req.user.id;
                const evaluateEmail = await db.query(
                    queries.checkIfUserExist,
                    [receiversEmail]
                )
                if (evaluateEmail.rowCount !== 1) {
                    res
                        .status(500)
                        .json({'status': 500, 'message': 'Invalid Email'});
                } else {
                    let receiversid = evaluateEmail
                        .rows[0]
                        .id;
                    const createdOn = moment(new Date());
                    const messageToInsert = [subject, message, createdOn, 'sent'];
                    const populateMessageTable = await db.query(
                        queries.sendMessages,
                        messageToInsert
                    );

                    const messageId = populateMessageTable
                        .rows[0]
                        .id;
                    const sentMessageValues = [messageId, senderId];
                    const inboxMessageValue = [messageId, receiversid, status];
                    const insertSent = await db.query(queries.sent, sentMessageValues);
                    const insertInbox = await db.query(queries.inbox, inboxMessageValue);
                    res
                        .status(201)
                        .json({
                            status: 200,
                            data: [
                                {
                                    id: messageId,
                                    createdOn,
                                    subject,
                                    message,
                                    parentMessageId: null,
                                    status: 'sent'
                                }
                            ]
                        });
                }
            } else {
                res
                    .status(401)
                    .json({'status': 400, 'message': 'Invalid Input'})
            }
        } catch  {}
    }
    static async getAllMessages(req, res) {
        try {
            const userId = req.user.id;
            const {messageId} = req.params;
            const validateNumber = schema.validateNumber(messageId);
            if (validateNumber.error === null) {
                let allMessages = await db.query(queries.fetchAllmessages, [userId, messageId]);
                let {rows} = allMessages
                if (rows.length) {
                    res
                        .status(401)
                        .json({status: 401, Message: 'No New Message for the logged in User'});
                } else {
                    res
                        .status(200)
                        .json({
                            status: 200,
                            data: [...rows],
                            success: true
                        });
                }

            } else {
                res
                    .status(400)
                    .json({status: 400, error: 'Invalid Parameters Parsed'});
            }
        } catch (e) {}
    }
    static async getAllInboxMessages(req, res) {
        try {
            const userId = req.user.id;
            const allInBoxMessages = await db.query(queries.inboxMessages, [userId]);
            res
                .status(200)
                .json({
                    status: 200,
                    data: [...allInBoxMessages.rows]
                });
        } catch (e) {
            res
                .status(500)
                .json({status: 500, error: `can't get messages`});
        }
    }

    static async getAllUnreadMessages(req, res) {
        try {
            const userId = req.params.id;
            const allUnreadMessages = await db.query(
                queries.getUnreadMessages,
                [userId, 'unread']
            );
            res
                .status(200)
                .json({
                    status: 200,
                    data: [...allUnreadMessages.rows]
                });
        } catch (e) {
            res
                .status(500)
                .json({status: 500, error: `can't get messages`});
        }
    }

    static async getSentMails(req, res) {
        try {
            const userId = req.params.id;
            const allSentMessages = await db.query(
                queries.getSentMessages,
                [userId, 'sent']
            );
            res
                .status(200)
                .json({
                    status: 200,
                    data: [...allSentMessages]
                });
        } catch (e) {
            res
                .status(500)
                .json({status: 500, error: `can't get messages`});
        }
    }
    static async deleteMessage(req,res){
        try{
        const userId = req.params.id
        const {messageId} = req.params;
        const validateNumber = schema.validateNumber(messageId);
        if(validateNumber.error===null){
        const evaluateMessageOwner = await db.query(queries.checkOwnerOfMessage,[userId,messageId]);
        if(evaluateMessageOwner.rowCount===0){
            res.status(400).json({ status: 400, message:'unauthorized operation'});
            
        }else{
            const { messageToDelete  } = evaluateMessageOwner.rows[0];
            const deleteSent = await db.query(queries.deleteFromSentMessage,[messageId]);   
            const deleteInbox =await db.query(queries.deleteFromInboxMessage,[messageId]);
            const deletFromMessage = await db.query(queries.deletFromMessage,[messageId]);
            res.status(200).json({ status: 200, data: [{ message }] });
            }
        }else{
            res.status(400).json({status:400,Message:'Input Not a Number'});
           
        }
        }catch(e){
            res
            .status(500)
            .json({status: 500, error: `message error`});
        }
    }
}
