import amqp from "amqplib";

let channel: any;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost");

  channel = await connection.createChannel();

  await channel.assertExchange("auth_exchange", "topic", {
    durable: true,
  });

  console.log("RabbitMQ connected");
};

export const publishEvent = async (routingKey: string, message: any) => {
  if (!channel) throw new Error("RabbitMQ not initialized");

  channel.publish(
    "auth_exchange",
    routingKey,
    Buffer.from(JSON.stringify(message))
  );
};