import nats, { Stan } from 'node-nats-streaming';

// Event-bus
class NatsWrapper {
  private _client?: Stan;

  // Get instance
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  // Connect to event-bus
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url, waitOnFirstConnect: true });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
