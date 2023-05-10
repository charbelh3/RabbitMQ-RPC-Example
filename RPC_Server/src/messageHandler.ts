import rabbitClient from "./rabbitmq/client";

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = {};

    const { num1, num2 } = data;

    console.log("The operation is", operation);

    switch (operation) {
      case "multiply":
        response = num1 * num2;
        break;

      case "sum":
        response = num1 + num2;
        break;

      default:
        response = 0;
        break;
    }

    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
