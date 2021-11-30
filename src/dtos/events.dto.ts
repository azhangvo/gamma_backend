import { IsArray, IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  public organization: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsArray()
  public attendees: string[];

  @IsBoolean()
  public isEnabled: boolean;

  @IsBoolean()
  public showAttendees: boolean;
}
