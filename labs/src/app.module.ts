import { Module } from '@nestjs/common';
import { LabsModule } from './modules/labs/labs.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { KafkaClientOptions } from './options/kakfa-client.options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LabsModule,
    DatabaseModule,
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
