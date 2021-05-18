const twilio = require("twilio");
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SID;

const sendSMS = async (recipient, message) => {
  return await client.messages.create({
    body: message,
    to: recipient,
    from: twilioPhoneNumber,
    messagingServiceSid
  });
};

export default sendSMS;