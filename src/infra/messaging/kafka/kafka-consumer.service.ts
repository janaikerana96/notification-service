import { OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'dikota-notifications',
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
