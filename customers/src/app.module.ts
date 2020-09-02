import { Module } from '@nestjs/common';
import { CustomersModule } from './modules/customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { KafkaClientOptions } from './options/kafka.client.options';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomersModule,
  ],
  providers: [
    KafkaClientOptions,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: async (kafkaClientOptions: KafkaClientOptions) => {
        const options = await kafkaClientOptions.getKafkaOptions();
        return ClientProxyFactory.create({ ...options });
      },
      inject: [KafkaClientOptions],
    },
  ],
})
export class AppModule {}
