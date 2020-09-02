import { ICommandHandler } from '@nestjs/cqrs';
import { CreateHabitanCommand } from '../impl/create-habitan.command';
import { Logger } from '@nestjs/common';
import { Habitan } from 'src/modules/type-of-sample/models/habitan.model';
import { HabitanRepository } from 'src/modules/type-of-sample/repositories/habitan.repository';
export declare class CreateHabitanHandler implements ICommandHandler<CreateHabitanCommand> {
    private readonly habitanRepository;
    logger: Logger;
    constructor(habitanRepository: HabitanRepository);
    execute(command: CreateHabitanCommand): Promise<Habitan>;
}
