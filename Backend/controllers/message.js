const Message = require('../model/message');
const messageStore = require('../data/message');

module.exports = {
    sendMessage: (req, res) => {
        const messageData = req.body;
        const message = new Message(
            messageData.messageId,
            messageData.createdOn,
            messageData.subject,
            messageData.message,
            messageData.parentMessageId,
            messageData.status,
            messageData.senderId,
            messageData.recieverId,
        );

        message.messageId = messageStore.length;
        message.createdOn = Date.now();

        if (message.status === 'sent' || message.status === 'read') {
            messageStore.push(message);
            res
                .status(200)
                .json({'message': 'Message Sent'});
        } else {

            if (message.status === 'draft') {
                messageStore.push(message);
                res.json({'message': 'Message Saved', 'status': '200'});
            }

        }
    },

    getAllRecivedMessages: (req, res) => {
        data = messageStore.filter(
            recievedMessages => recievedMessages.recieverId == req.params.id 
        );
        res
            .status(200)
            .json({'status': 200, data})

    },
    getUnreadMeassages: (req,res)=>{
      data = messageStore.filter(unreadMessages =>(unreadMessages.status === 'unread' && unreadMessages.recieverId === req.params.id));
      res.status(200).json({'status':200,data});
    },
    getSentMessages:(req,res)=>{
      data = messageStore.filter(sentMessages => sentMessages.senderId === req.params.id)  
      res.status(200).json({'status':200,data});
    }

}
