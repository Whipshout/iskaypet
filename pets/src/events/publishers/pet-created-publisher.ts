import { Publisher, Subjects, PetCreatedEvent } from '@wutils/common';

// PetCreated event-bus
export class PetCreatedPublisher extends Publisher<PetCreatedEvent> {
  subject: Subjects.PetCreated = Subjects.PetCreated;
}
