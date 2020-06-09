import { Module } from '@nestjs/common';
import { LabsModule } from './modules/labs/labs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LabsModule,
  ],
})
export class AppModule {}
