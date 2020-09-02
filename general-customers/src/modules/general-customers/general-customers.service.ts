import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GeneralCustomersService {
  logger = new Logger(this.constructor.name);

  constructor() {}
}
