import bodyParser from 'body-parser';
import user from '../data/user';
import messageStore from '../data/message';
import messageModel from '../model/message';

/* Imports the datastructure that holds users and messages
before continuing */
bodyParser.json();

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
          if(newMessages.status ==='draft' || newMessages.recieversEmail ===''){
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
          }
        else{
          if(!evaluateUser ){
          res.status(401).json({'message': "Invalid Email"});
          }
        }
    }
  }
  static getAllMessages(req,res){

 
 
 let   recievedMessages = messageStore.filter(recievedMessages => recievedMessages.id === req.params.id);
    res .status(200).json({'status': 200, recievedMessages})
  }
}
