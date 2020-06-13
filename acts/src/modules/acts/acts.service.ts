import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from './models/act.model';
import { ActRepository } from './act.repository';
import {
  CustomerRepository,
  GCustomerRepository,
  LabRepository,
} from './references.repository';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';
import { NewActDto } from './models/dto/new-act.dto';

@Injectable()
export class ActsService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly gcustomerRepository: GCustomerRepository,
    private readonly labRepository: LabRepository,
  ) {}

  async createActFromMigration(act: MigrationCreateActDto): Promise<Act> {
    this.logger.verbose('inside migration method of `ActsService`');
    const lab = await this.labRepository.findOne(act.lab);
    const customer = await this.customerRepository.findOne(act.customer);
    const gcustomer = await this.gcustomerRepository.findOne(act.generalCustomer);
    this.logger.log(`lab, customer, gc: ${lab}, ${customer}, ${gcustomer} `)
    if (!lab) {
      const newLab = this.labRepository.create({ id: act.lab });
      this.logger.log(`newlab: ${newLab}`)
      await this.labRepository.save(newLab);
    }
    if (!customer) {
      const newCustomer = this.customerRepository.create({ id: act.customer });
      this.logger.log(`newcustomer: ${newCustomer}`)
      await this.customerRepository.save(newCustomer);
    }
    if (!gcustomer) {
      const newGC = this.gcustomerRepository.create({
        id: act.generalCustomer,
      });
      this.logger.log(`newgc: ${newGC}`)
      await this.gcustomerRepository.save(newGC);
    }
    const newAct = await this.actRepository.migrationCreateAct(act);

    return await this.addReferencesToAct(newAct, act)
  }

  async addReferencesToAct(newAct: Act, act: MigrationCreateActDto): Promise<Act> {
    newAct.customer = await this.customerRepository.findOne(act.customer)
    newAct.general_customer = await this.gcustomerRepository.findOne(act.generalCustomer)
    newAct.lab = await this.labRepository.findOne(act.lab)
    this.logger.log(`after references ${JSON.stringify(newAct, null, 2)}`)
    return await newAct.save()
  }
}
