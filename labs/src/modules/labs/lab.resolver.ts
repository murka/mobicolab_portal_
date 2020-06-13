import { OnModuleInit, Inject, Logger } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lab } from './models/lab.model';
import { LabRepository } from './lab.repository';
import { CommandBus } from '@nestjs/cqrs';
import { ChangeLabIdCommand } from './commands/impl/change-lab-id.command';
import { InsertLabDto } from './models/dto/insert-lab.dto';
import { CreateLabCommand } from './commands/impl/create-lab.command';
import { CreateLabDto } from './models/dto/create-lab.dto';
import { UpdateLabCommand } from './commands/impl/update-lab.command';

interface LabService {
  findAllLabs(data: number): Observable<Lab>;
}

@Resolver(of => Lab)
export class LabResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private labService: LabService;

  constructor(
    private readonly labRepository: LabRepository,
    @Inject('LAB_PACKAGE') private readonly client: ClientGrpc,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit() {
    this.labService = this.client.getService<LabService>('LabSevice');
  }

  @Query(returns => [Lab])
  async customers(): Promise<Lab[]> {
    return await this.labRepository.find();
  }

  @Query(returns => Lab)
  async customer(@Args('id') id: string): Promise<Lab> {
    return await this.labRepository.findOne(id);
  }

  @Query(returns => Lab)
  transformLabs(): Observable<Promise<Lab>> {
    return this.labService.findAllLabs(1).pipe(
      map(async lab => {
        const newLab = await this.labRepository.migrationCreateLab(lab);
        await this.commandBus.execute(
          new ChangeLabIdCommand(newLab.id, lab.id),
        );
        this.logger.verbose(newLab);
        return newLab;
      }),
    );
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
  async resolverReference(reference: { __typename: string; id: string }) {
    return await this.labRepository.findOne(reference.id);
  }
}
