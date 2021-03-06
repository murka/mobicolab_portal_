import { Injectable, Logger } from '@nestjs/common';
import { HabitanRepository } from './repositories/habitan.repository';
import { Act } from '../acts/models/act.model';
import { HTypeRepository } from './repositories/htype.repository';
import { Habitan } from './models/habitan.model';
import { HType } from './models/htype.model';
import { ActRepository } from '../acts/repositories/act.repository';
import { TypeOfSample } from './models/type-of-sample.model';
import { TOSRepository } from './repositories/tos.repository';

@Injectable()
export class TypeOfSampleService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly habitanRepository: HabitanRepository,
    private readonly htypeRepository: HTypeRepository,
    private readonly tosRepository: TOSRepository,
    private readonly actRepository: ActRepository,
  ) {}

  async findHabitan(id: string): Promise<Habitan> {
    this.logger.verbose('find-habitan');

    try {
      return await this.habitanRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findHType(id: string): Promise<HType> {
    this.logger.verbose('find-htype');

    try {
      return await this.htypeRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findTOS(
    habitnaId: string,
    htypeId: string,
  ): Promise<{ tos: TypeOfSample; habitan: Habitan; htype: HType }> {
    this.logger.verbose('get-tos');

    try {
      let habitan = await this.findHabitan(habitnaId);

      if (!habitan) {
        const newHabitan = this.habitanRepository.create({ id: habitnaId });
        habitan = await this.habitanRepository.save(newHabitan);
      }

      let htype = await this.findHType(htypeId);

      if (!htype) {
        const newHtype = this.htypeRepository.create({ id: htypeId });
        htype = await this.htypeRepository.save(newHtype);
      }

      let tos = await this.tosRepository.findOne({
        where: { habitan: { id: habitan.id }, htype: { id: htype.id } },
      });

      this.logger.log(JSON.stringify(tos));

      if (!tos) {
        this.logger.error('tos created');
        tos = this.tosRepository.create({ habitan: habitan, htype: htype });
      }

      return { tos, habitan, htype };
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findTOSById(id: string): Promise<TypeOfSample> {
    this.logger.verbose('find-tos-by-id');

    try {
      return this.tosRepository.findOne(id, {
        relations: ['habitan', 'htype'],
      });
    } catch (error) {
      this.logger.error(`${error}: ${error.message}`);
    }
  }

  async getActsOfHabitan(id: string): Promise<Act[]> {
    this.logger.verbose('get-acts-of-type-sample.method');

    try {
      const tos = (await this.habitanRepository.findOne(id)).type_of_samples;

      return await this.actRepository.find({ where: { typeOfSample: tos } });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getActsOfHType(id: string): Promise<Act[]> {
    this.logger.verbose('get-acts-of-type-sample.method');

    try {
      const tos = (await this.htypeRepository.findOne(id)).type_of_samples;

      return await this.actRepository.find({ where: { typeOfSample: tos } });
    } catch (error) {
      this.logger.error(error);
    }
  }

  habitanCreated(id: string): void {
    this.logger.verbose('habitan-created');

    const habitan = this.habitanRepository.create({ id: id });

    this.habitanRepository.save(habitan);
  }

  async habitanUpdated(id: string): Promise<void> {
    this.logger.verbose('habitan-updated');

    try {
      const habitan = await this.habitanRepository.findOne(id);

      if (habitan) {
        return;
      } else {
        const habitan = this.habitanRepository.create({ id: id });

        this.habitanRepository.save(habitan);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  htypeCreated(id: string) {
    this.logger.verbose('htype-created');

    const htype = this.htypeRepository.create({ id: id });

    this.htypeRepository.save(htype);
  }

  async htypeUpdated(id: string): Promise<void> {
    this.logger.verbose('htype-updated');

    try {
      const htype = await this.htypeRepository.findOne(id);

      if (htype) {
        return;
      } else {
        const htype = this.htypeRepository.create({ id: id });

        await this.htypeRepository.save(htype);
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
