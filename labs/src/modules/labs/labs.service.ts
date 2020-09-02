import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LabsService {
  logger = new Logger(this.constructor.name);

  constructor() {}
}
