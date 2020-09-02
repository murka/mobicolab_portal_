import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateHabitanCommand } from '../impl/update-habitan.command';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';
import { Logger } from '@nestjs/common';
export declare class UpdateHabitanHandler implements ICommandHandler<UpdateHabitanCommand> {
    private readonly habitanRepository;
    logger: Logger;
    constructor(habitanRepository: HabitanRepository);
    execute(command: UpdateHabitanCommand): Promise<Habitan>;
}
