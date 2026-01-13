import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationsDto {
  @ApiProperty({
    description: 'ID do destinatário da notificação',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @ApiProperty({
    description: 'Conteúdo da notificação (entre 5 e 248 caracteres)',
    example: 'Você recebeu uma nova mensagem',
    minLength: 5,
    maxLength: 248,
  })
  @IsNotEmpty()
  @Length(5, 248)
  content: string;

  @ApiProperty({
    description: 'Categoria da notificação',
    example: 'social',
  })
  @IsNotEmpty()
  category: string;
}
