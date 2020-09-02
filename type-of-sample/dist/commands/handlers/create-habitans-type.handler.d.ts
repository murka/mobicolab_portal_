import { ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { HabitansTypeRepository } from 'src/modules/type-of-sample/repositories/habitans-type.repository';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';
import { CreateHabitansTypeCommand } from '../impl/create-habitans-type.command';
export declare class CreateHabitansTypeHandler implements ICommandHandler<CreateHabitansTypeCommand> {
    private readonly habitanRepository;
    private readonly htRepository;
    logger: Logger;
    constructor(habitanRepository: HabitanRepository, htRepository: HabitansTypeRepository);
    execute(command: CreateHabitansTypeCommand): Promise<HabitansType>;
}
