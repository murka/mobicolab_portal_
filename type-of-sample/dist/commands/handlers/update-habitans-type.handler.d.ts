import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitansTypeCommand } from '../impl/update-habitans-type.command';
import { Logger } from '@nestjs/common';
import { HabitansType } from 'src/modules/type-of-sample/models/habitans-type.model';
import { HabitansTypeRepository } from 'src/modules/type-of-sample/repositories/habitans-type.repository';
export declare class UpdateHabitansTypeHandler implements ICommandHandler<UpdateHabitansTypeCommand> {
    private readonly htRepository;
    logger: Logger;
    constructor(htRepository: HabitansTypeRepository);
    execute(command: UpdateHabitansTypeCommand): Promise<HabitansType>;
}
