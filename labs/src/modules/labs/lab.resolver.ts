import { OnModuleInit, Inject, Logger } from '@nestjs/common';
import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lab } from './models/lab.model';
import { InjectRepository } from '@nestjs/typeorm';
import { LabRepository } from './lab.repository';

interface LabService {
  findAllLabs(data: number): Observable<Lab>;
}

@Resolver(of => Lab)
export class LabResolver implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private labService: LabService;

  constructor(
    @InjectRepository(LabRepository)
    private readonly labRepository: LabRepository,
    @Inject('LAB_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  @Query(returns => [Lab])
  async customers(): Promise<Lab[]> {
    return await this.labRepository.findAll()
  }

  @Query(returns => Lab)
  async customer(@Args('id') id: string): Promise<Lab> {
    return await this.labRepository.findLab(id)
  }

  @Query(returns => Lab)
  transformLabs(): Observable<Lab> {
    return this.labService.findAllLabs(1).pipe(
      map(lab => {
        const newLab = this.labRepository.createLab(
          lab,
        );
        this.logger.verbose(newLab);
        return newLab;
      }),
    );
  }

  @ResolveReference()
  async resolverReference(reference: { __typename: string; id: string }) {
    return await this.labRepository.findLab(reference.id);
  }

  onModuleInit() {
    this.labService = this.client.getService<LabService>('LabSevice');
  }
}
