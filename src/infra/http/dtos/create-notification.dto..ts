import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationsDto {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 248)
  content: string;

  @IsNotEmpty()
  category: string;
}
