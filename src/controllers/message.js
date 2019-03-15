import bodyParser from 'body-parser';
import user from '../data/user';
import messageStore from '../data/message';
import messageModel from '../model/message';

/* Imports the datastructure that holds users and messages
before continuing */


export default class MessageController {
    static sendMessage(req, res) {
        const messageData = req.body;

        const newMessages = new messageModel(
            messageData.messageId = messageStore.length,
            messageData.createdOn = Date.now,
            messageData.subject,
            messageData.message,
            messageData.parentMessageId,
            messageData.status,
            messageData.recieversEmail,
            messageData.sendersEmail
        )

        let evaluateUser = user.find(
            dataBaseUser => dataBaseUser.email === newMessages.recieversEmail
        );

        if (evaluateUser && newMessages.status === 'sent') {
            messageStore.push(newMessages);
            const sentMessage = {
                messageId: newMessages.messageId,
                createdOn: newMessages.createdOn,
                subject: newMessages.subject,
                message: newMessages.message,
                status: newMessages.status
            }
            res
                .status(201)
                .json({'status': 201, sentMessage, 'message': 'Message Sent Successfully'})

        } else {
            if (newMessages.status === 'draft' || newMessages.recieversEmail === '') {
                messageStore.push(newMessages)
                const sentMessage = {
                    messageId: newMessages.messageId,
                    createdOn: newMessages.createdOn,
                    subject: newMessages.subject,
                    message: newMessages.message,
                    status: newMessages.status
                }
                res
                    .status(201)
                    .json({'status': 201, sentMessage, 'message': 'Message Saved Successfully'})
            } else {
                if (!evaluateUser) {
                    res.status(401).json({'message': "Invalid Email"});
                }
            }
        }
    }
 static getAllMessages(req,res){
    
     this.evaluateUser = user.find(dataBaseUser => dataBaseUser.recieversId === req.params.id);
     console.log(evaluateUser);
     
        res .status(200).json({'status': 200, evaluateUser})

    
     
    
 }


//     static getAllMessages(req, res) {
//      const getAllMessages = messageStore.filter(recievedMsg => recievedMsg.recieversId ===req.params.id);
//      return res.status(200).json(getAllMessages)
     
//     }

//     static getSpecificMail(req, res) {
//        const specificMessages = messageStore.find(
//             specificMail => specificMail.messageId === req.params.id
//         );
//         res.status(200).json({'status': 200, specificMessages});
//     }

//     static getAllUreadMessages(req, res) {
//         let ureadMessages = (
//             unreadMessages => (unreadMessages.status === 'unread' && unreadMessages.recieversId === req.params.id)
//         );
//         res
//             .status(200)
//             .json({'status': 200, ureadMessages});
//     }

//     static getSentMessages(req,res){
//        const allsentMessagses= messageStore.filter(sentMessages => sentMessages.sendersId === req.params.id)  
//         res.status(200).json({'status':200,allsentMessagses});

// }
// static deleteAspecificMail(req, res) {
//   const  messagetoDelete = messageStore.filter(
//         specificMail => specificMail.messageId=== req.params.id
//     );
//     messageStore.pop(messagetoDelete);
//     res(200).json({'status': 200, 'message':'Message Deleted'});
// }
}