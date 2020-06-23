import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DocsModule } from './modules/docs/docs.module';

@Module({
  imports: [
    DocsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule
  ],
})
export class AppModule {}
