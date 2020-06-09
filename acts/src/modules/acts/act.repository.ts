import { EntityRepository, AbstractRepository, Repository } from 'typeorm';
import { Act } from './models/act.model';
import { Customer } from './models/customer.model';
import { GCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { Logger } from '@nestjs/common';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
  logger = new Logger(this.constructor.name);
  async findAct(id: string) {
    return this.findOne(id)
  } 

  async migrationCreateAct(act: MigrationCreateActDto): Promise<Act> {
    this.logger.verbose('inside ActRepolsitory - createAct method');
    const newAct = new Act();
    // newAct.id = act.id;
    newAct.name = act.name;
    newAct.typeOfSample = act.typeOfSample
    newAct.objectName = act.objectName
    newAct.place = act.place;
    newAct.datetime = act.datetime
    newAct.method = act.method
    newAct.toolType = act.toolType
    newAct.climaticEnvironmental = act.climaticEnvironmental
    newAct.planning = act.planning
    newAct.normativeDocument = act.normativeDocument
    newAct.sampleType = act.sampleType
    newAct.sample = act.sample
    newAct.preparation = act.preparation
    newAct.goal = act.goal
    newAct.definedIndicators = act.definedIndicators
    newAct.additions = act.additions
    newAct.informationAboutSelection = act.informationAboutSelection
    newAct.environmentalEngineer = act.environmentalEngineer
    newAct.representative = act.representative
    newAct.passedSample = act.passedSample
    newAct.application = act.application
    return await newAct.save()
  }
}

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async findCustomer(id: string) {
    return await this.find({ id: id })
  }

  async getActsOfCustomer(customerId: string) {
    return (await this.findOne(customerId)).acts
  }

  async createCustomer(customerId: string) {
    return await this.create({ id: customerId }).save()
  }

  async migrationCreate(id: string) {
    const newItem = new Customer()
    newItem.id = id
    return await newItem.save()
  }
}

@EntityRepository(GCustomer)
export class GCustomerRepository extends Repository<GCustomer> {
  async findGcustomer(id: string) {
    return await this.findOne(id)
  }

  async getActsOfGCustomer(gcustomerId: string) {
    return (await this.findOne(gcustomerId)).acts
  }

  async createGCustomer(gcustomerId: string) {
    const newGCustomer = new GCustomer();
    newGCustomer.id = gcustomerId
    return await newGCustomer.save();
  }

  async migrationCreate(id: string) {
    const newItem = new GCustomer()
    newItem.id = id
    return await newItem.save()
  }
}


