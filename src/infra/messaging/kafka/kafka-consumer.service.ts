import { OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

  export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{
    constructor() {
        super({})
    }
      async onModuleDestroy() {
        await this.close()
      }
  }