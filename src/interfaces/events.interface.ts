export interface Event {
  _id: string;
  uuid: string;
  organization: string;
  name: string;
  description: string;
  attendees: string[];
  isEnabled: boolean;
  showAttendees: boolean;
}
