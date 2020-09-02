import {
  ClientProviderOptions,
  ClientOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KafkaClientOptions {
  logger = new Logger(this.constructor.name);

  public kafkaClientOptions: ClientOptions;

  constructor(private readonly configService: ConfigService) {}

  async getKafkaOptions(): Promise<ClientOptions> {
    let brokers: string[] = [];

    const kafkaHost = this.configService.get('KAFKA_HOST');

    for await (let i of [1, 2, 3]) {
      const port = this.configService.get(`KAFKA_PORT${i}`);
      if (port) {
        brokers.push(`${kafkaHost}:${port}`);
      }
      this.logger.log(JSON.stringify(brokers, null, 2));
    }

    return (this.kafkaClientOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'general-customer',
          brokers,
        },
        consumer: {
          groupId: 'general-customer-consumer',
        },
      },
    });
  }
}
