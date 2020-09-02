import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Act } from './models/act.model';
import { ActRepository } from './act.repository';
import { HType } from '../htypes/models/habitans-type.model';
import { HTypeService } from '../htypes/htype.service';

@Injectable()
export class ActService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    @Inject(forwardRef(() => HTypeService))
    private readonly htypeService: HTypeService,
  ) {}

  async getAct(id: string): Promise<Act> {
    this.logger.verbose('get-act.method');

    try {
      const act = await this.actRepository.findOne(id);

      if (!act)
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, error: 'Act didn`t find' },
          HttpStatus.NOT_FOUND,
        );

      return act;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createAct(id: string): Promise<Act> {
    this.logger.verbose('create-act.method');

    try {
      const act = this.actRepository.create({ id });

      return await this.actRepository.save(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  saveAct(act: Act): void {
    this.logger.verbose('save-act.method');

    try {
      this.actRepository.save(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  getHType(id: string): Promise<HType> {
    this.logger.verbose('get-htype.method');

    try {
      return this.htypeService.getHType(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
