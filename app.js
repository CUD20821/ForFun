const amqp = require("amqplib");
const url =
  "amqps://rrlwqahk:ZbUdQXOuaay3NktczvliRq8TwJeawu99@rattlesnake.rmq.cloudamqp.com/rrlwqahk";
const queue = "duc";

async function receiveMessage() {
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("Failed to receive message:", err);
  }
}

receiveMessage();