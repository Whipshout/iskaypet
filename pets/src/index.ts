import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';

import { app } from './app';

const start = async () => {
  console.log('[::Pets::] Starting up...');

  // Check env variables
  if (!process.env.MONGO_URI) {
    throw new Error('[::Pets::] MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('[::Pets::] NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('[::Pets::] NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('[::Pets::] NATS_CLUSTER_ID must be defined');
  }

  try {
    // Event-bus connection
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    process.on('close', () => {
      console.log('[::Pets::] NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on("uncaughtException", function (err) {
      console.log(err);
    });

    // Connection to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('[::Pets::] Connected to MongoDb!');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('[::Pets::] Listening on port 3000!');
  });
};

start();
