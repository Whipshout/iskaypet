import { Message } from 'node-nats-streaming';
import { Subjects, Listener, PetCreatedEvent } from '@wutils/common';
import { queueGroupName } from './queue-group-name';
import { getData } from '../../services/postgres-actions'

// PetCreated listener event-bus
export class PetCreatedListener extends Listener<PetCreatedEvent> {
  subject: Subjects.PetCreated = Subjects.PetCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PetCreatedEvent['data'], msg: Message) {
    const { species, age } = data;

    try {
      await getData({ species, age })
    } catch (err) {
      throw new Error(err);
    }

    msg.ack();
  }
}
