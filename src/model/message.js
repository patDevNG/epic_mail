
export default class Message {
    constructor(
      messageId,
      createdOn,
      subject,
      message,
      parentMessageId,
      status,
      recieversEmail,
      sendersEmail
    ) {
      this.messageId = messageId;
      this.createdOn = createdOn;
      this.subject = subject;
      this.message = message;
      this.parentMessageId = parentMessageId;
      this.status = status;
      this.recieversEmail = recieversEmail,
      this.sendersEmail = sendersEmail
      
    }
  }
  
  
  
