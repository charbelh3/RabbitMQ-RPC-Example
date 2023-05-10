import { Channel } from "amqplib";

export default class Producer {
  constructor(private channel: Channel) {}

  async produceMessages(
    data: any,
    correlationId: string,
    replyToQueue: string
  ) {
    console.log("Responding with..", data);
    this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
      correlationId: correlationId,
    });
  }
}
