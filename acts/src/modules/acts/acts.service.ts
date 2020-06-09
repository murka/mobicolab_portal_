import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import {
  ActRepository,
  CustomerRepository,
  GCustomerRepository,
} from './act.repository';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';
import { LabRepository } from './lab.repository';
import { Repository } from 'typeorm';
import { Lab } from './models/lab.model';

@Injectable()
export class ActsService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly gcustomerRepository: GCustomerRepository,
    @InjectRepository(Lab)
    private readonly labRepository: Repository<Lab>,
  ) {}

  async findAllActs(): Promise<Act[]> {
    return await this.actRepository.find();
  }

  async findActById(id: string): Promise<Act> {
    return await this.actRepository.findOne(id);
  }

  async createActFromMigration(act: MigrationCreateActDto): Promise<Act> {
    this.logger.log(act)
    const newAct = this.actRepository.findOne(act.id)
    // const lab = this.labRepository.findLab(act.lab)
    const lab = this.labRepository.findOne(act.id)
    // const customer = this.customerRepository.findCustomer(act.customer)
    const gcustomer = this.gcustomerRepository.findGcustomer(act.generalCustomer)
    // this.labRepository.migrationCreate(act.lab)
    this.customerRepository.migrationCreate(act.customer)
    this.gcustomerRepository.migrationCreate(act.generalCustomer)
    return await this.actRepository.migrationCreateAct(act);
  }

  async getActsOfCustomer(customerId: string): Promise<Act[]> {
      return await this.customerRepository.getActsOfCustomer(customerId)
  }

  async getActsOfGCustomer(gcustomerId: string): Promise<Act[]> {
      return await this.gcustomerRepository.getActsOfGCustomer(gcustomerId)
  }

  async getActsOfLabs(labId: string): Promise<Act[]> {
      // return await this.labRepository.getActsOfLabs(labId)
      return (await this.labRepository.findOne(labId)).acts
  }
}
