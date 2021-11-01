import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { PetCreatedListener } from './events/listeners/pet-created-listener'
import { createTable } from './services/postgres-table'

const start = async () => {
  console.log('[::Stats::] Starting up...');

  // Check env variables
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('[::Stats::] NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('[::Stats::] NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('[::Stats::] NATS_CLUSTER_ID must be defined');
  }

  try {
    // Event-bus connection
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('[::Stats::] NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    process.on("uncaughtException", function (err) {
      console.log(err);
    });

    // Create postgres table
    await createTable();

    // Event-bus listener for PetCreated
    new PetCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('[::Stats::] Listening on port 3000!');
  });
};

start();
