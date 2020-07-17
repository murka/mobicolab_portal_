import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';

@Module({
  providers: [ActResolver]
})
export class ActModule {}
