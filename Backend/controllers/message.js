const Message = require('../model/message');
const messageStore = require('../data/message');



module.exports = {
  sendMessage: (req, res) => {
    let messageId = messageStore.length;
        const sendersId = req.body.senderId;
        const reciversMail = req.body.recieversMail;
        const createdOn = Date.now();
        const subject = req.body.subject;
        const messageBody = req.body.message;
        let status = req.body.status;
  
        const reciever = userStore.find(reciever => reciever.email === reciversMail);
        if (reciever === undefined) {
            res.status(401).json({'status': '401', 'Message': 'Email Does not Exist'})
        }else{

        const message = new Message(
          messageId,
          createdOn,
          subject,
          message,
          parentMessageId,
          status,
          senderId,
          reciever.id,
        );
    message.messageId = messageStore.length;
    message.createdOn = Date.now();
    console.log(message);
    
    
    if (message.status === 'sent' || message.status ==='read'){
    messageStore.push(message);
    res.status(200).json({'message':'Message Sent'});
    }else{

     if(message.status ==='draft'){
      messageStore.push(message);
         res.json({'message':'Message Saved', 'status':'200'});
    }
  }
    
  }
},

}
