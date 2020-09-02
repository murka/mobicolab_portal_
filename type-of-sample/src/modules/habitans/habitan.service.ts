import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { ActService } from '../type-of-sample/act.service';
import { HabitanRepository } from './habitan.repository';
import { Act } from '../type-of-sample/models/act.model';
import { Habitan } from './models/habitan.model';

@Injectable()
export class HabitanService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanRepository: HabitanRepository,
    @Inject(forwardRef(() => ActService))
    private readonly actService: ActService,
  ) {}

  getHabitan(id: string): Promise<Habitan> {
    this.logger.verbose('get-habitan.method');

    try {
      return this.habitanRepository.getHabitanById(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  createHabitan(label: string): Promise<Habitan> {
    this.logger.verbose('create-habitan.method');

    try {
      return this.habitanRepository.newHabitan(label);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  updateHabitan(id: string, label: string): Promise<Habitan> {
    this.logger.verbose('update-habitan.method');

    try {
      return this.habitanRepository.updateHabitan(id, label);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  saveAct(act: Act): void {
    this.logger.verbose('save-habitan.method');

    try {
      this.actService.saveAct(act);
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

  newAct(id: string): Promise<Act> {
    this.logger.verbose('new-act.method');

    try {
      return this.actService.createAct(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
