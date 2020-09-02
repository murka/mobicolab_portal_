import { Module } from '@nestjs/common';
import { ActResolver } from './act.resolver';
import { ActService } from './act.service';
import { CreatorService } from './creator.service';

@Module({
  providers: [ActResolver, ActService, CreatorService],
})
export class ActModule {}
