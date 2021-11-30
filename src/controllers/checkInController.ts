import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import EventsService from '@services/events.service';
import { Event } from '@interfaces/events.interface';

class CheckInController {
  public eventService = new EventsService();

  public signInWithId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const uuid: string = req.params.id;

      const findOneEventData: Event = await this.eventService.findEventByUUID(uuid);
      const { _id, ...eventData } = { attendees: [userData.email, ...findOneEventData.attendees], ...findOneEventData };

      return await this.eventService.updateEvent(_id, eventData);
    } catch (error) {
      next(error);
    }
  };
}

export default CheckInController;
