import { CreateEventDto } from '@dtos/events.dto';
import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/events.interface';
import eventModel from '@models/events.model';
import { isEmpty } from '@utils/util';

class EventsService {
  public events = eventModel;

  public async findAllEvents(): Promise<Event[]> {
    const users: Event[] = await this.events.find();
    return users;
  }

  public async findEventById(eventId: string): Promise<Event> {
    if (isEmpty(eventId)) throw new HttpException(400, 'Missing event id');

    const findEvent: Event = await this.events.findOne({ _id: eventId });
    if (!findEvent) throw new HttpException(409, 'Could not find event');

    return findEvent;
  }

  public async findEventByUUID(eventUUID: string): Promise<Event> {
    if (isEmpty(eventUUID)) throw new HttpException(400, 'Missing event uuid');

    const findEvent: Event = await this.events.findOne({ uuid: eventUUID });
    if (!findEvent) throw new HttpException(409, 'Could not find event');

    return findEvent;
  }

  public async createEvent(eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, 'Missing event data');

    const findEvent: Event = await this.events.findOne({ email: eventData.uuid });
    if (findEvent) throw new HttpException(409, `Event ${eventData.uuid} already exists`);

    return await this.events.create(eventData);
  }

  public async updateEvent(eventId: string, eventData: CreateEventDto): Promise<Event> {
    if (isEmpty(eventData)) throw new HttpException(400, 'Missing event data');

    if (eventData.uuid) {
      const findEvent: Event = await this.events.findOne({ email: eventData.uuid });
      if (findEvent && findEvent._id != eventId) throw new HttpException(409, `Your UUID ${eventData.uuid} already exists`);
    }

    const updateUserById: Event = await this.events.findByIdAndUpdate(eventId, { eventData });
    if (!updateUserById) throw new HttpException(409, 'Update failed');

    return updateUserById;
  }

  // public async deleteUser(userId: string): Promise<Event> {
  //   const deleteUserById: Event = await this.events.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");
  //
  //   return deleteUserById;
  // }
}

export default EventsService;
