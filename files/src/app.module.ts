import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { DocsModule } from './modules/docs/docs.module';
import { DatabaseModule } from './database/database.module';
import { TemplateModule } from './modules/template/template.module';
import { KafkaClientOptions } from './options/kakfa-client.options';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    DocsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TemplateModule,
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
