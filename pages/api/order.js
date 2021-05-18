import sendSMS from "../../utils/twilio";

const getMessage = (cart, orderTotal) => {
  const orderId = Math.random().toString(36).substring(2, 9);
  return `Congratulations, your order (${orderId}) worth $${orderTotal} for ${cart.length} items has been processed successfully. The items will be delivered within 3 working days.`;
};

const handler = async (request, response) => {
  switch (request.method) {
    case "POST":
      const { cart, orderTotal, phoneNumber } = request.body;
      const message = getMessage(cart, orderTotal);
      // await sendSMS(phoneNumber, message);
      response.status(200).json({ message });
      break;
    default:
      response
        .status(405)
        .end("This method is not allowed for this route.");
  }
};

export default handler;