
class Message {
    constructor(
      messageId,
      createdOn,
      subject,
      message,
      parentMessageId,
      status,
      senderId,
      recieverId,
    ) {
      this.messageId = messageId;
      this.createdOn = createdOn;
      this.subject = subject;
      this.message = message;
      this.parentMessageId = parentMessageId;
      this.status = status;
      this.senderId = senderId;
      this.recieverId = recieverId;
    }
  }
  
  module.exports = Message;
  
