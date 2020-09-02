import { Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { Lab } from './models/lab.model';
import { LabRepository } from './lab.repository';
import { CommandBus } from '@nestjs/cqrs';
import { InsertLabDto } from './models/dto/insert-lab.dto';
import { CreateLabCommand } from './commands/impl/create-lab.command';
import { CreateLabDto } from './models/dto/create-lab.dto';
import { UpdateLabCommand } from './commands/impl/update-lab.command';

@Resolver(of => Lab)
export class LabResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly labRepository: LabRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => [Lab])
  async getLabs(): Promise<Lab[]> {
    return await this.labRepository.find();
  }

  @Query(returns => Lab)
  async getLab(@Args('id') id: string): Promise<Lab> {
    return await this.labRepository.findOne(id);
  }

  @Mutation(returns => Lab)
  async createLab(
    @Args('createLabData') createLabData: CreateLabDto,
  ): Promise<Lab> {
    return await this.commandBus.execute(new CreateLabCommand(createLabData));
  }

  @Mutation(returns => Lab)
  async updateLab(
    @Args('insertLabData') insertLabData: InsertLabDto,
  ): Promise<Lab> {
    return await this.commandBus.execute(new UpdateLabCommand(insertLabData));
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return await this.labRepository.findOne(reference.id);
  }
}

//   @Query(returns => Lab)
//   transformLabs(): Observable<Promise<Lab>> {
//     return this.labService.findAllLabs(1).pipe(
//       map(async lab => {
//         const newLab = await this.labRepository.migrationCreateLab(lab);
//         await this.commandBus.execute(
//           new ChangeLabIdCommand(newLab.id, lab.id),
//         );
//         this.logger.verbose(newLab);
//         return newLab;
//       }),
//     );
//   }
