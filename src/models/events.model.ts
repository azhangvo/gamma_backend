import { model, Schema, Document } from 'mongoose';
import { Event } from '@interfaces/events.interface';

const eventSchema: Schema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendees: {
    type: [String],
    required: true,
  },
  isEnabled: {
    type: Boolean,
    required: true,
  },
  showAttendees: {
    type: Boolean,
    required: true,
  },
});

const eventModel = model<Event & Document>('Event', eventSchema);

export default eventModel;
