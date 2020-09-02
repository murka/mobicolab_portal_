import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { HabitansTypeRepository } from './habitans-type.repository';
import { HType } from './models/habitans-type.model';
import { ActService } from '../type-of-sample/act.service';
import { Act } from '../type-of-sample/models/act.model';
import { Habitan } from '../habitans/models/habitan.model';
import { HabitanService } from '../habitans/habitan.service';

@Injectable()
export class HTypeService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly htypeRepository: HabitansTypeRepository,
    @Inject(forwardRef(() => ActService))
    private readonly actService: ActService,
    private readonly habitanService: HabitanService,
  ) {}

  getHType(id: string): Promise<HType> {
    this.logger.verbose('get-htype.method');

    try {
      return this.htypeRepository.findHTypeById(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  createHType(label: string): Promise<HType> {
    this.logger.verbose('create-htype.method');

    try {
      return this.htypeRepository.createHabitansType(label);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  updateHType(id: string, label: string): Promise<HType> {
    this.logger.verbose('update-htype.method');

    try {
      return this.htypeRepository.updateHabitansType(id, label);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async saveHType(htype: HType): Promise<HType> {
    this.logger.verbose('save-htype.method');

    try {
      return await this.htypeRepository.save(htype);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  getAct(id: string): Promise<Act> {
    this.logger.verbose('get-act.method');

    try {
      return this.actService.getAct(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  getHabitan(id: string): Promise<Habitan> {
    this.logger.verbose('get-habitan.method');

    try {
      return this.habitanService.getHabitan(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  saveAct(act: Act): void {
    this.logger.verbose('save-act.method');

    try {
      this.actService.saveAct(act);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
