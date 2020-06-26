import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Act } from './models/act.model';
import { ActRepository } from './act.repository';
import {
  CustomerRepository,
  GCustomerRepository,
  LabRepository,
  DocRepository,
} from './references.repository';
import { MigrationCreateActDto } from './models/dto/migration-create-act.dto';
import { Customer } from './models/customer.model';
import { GeneralCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface CustomerGrpcClient {
  addActsCusromerReference(data: {
    actId: string;
    contractorId: string;
  }): Observable<void>;
  getCustomersLabel({ id: string }): Observable<{ label: string }>;
}

interface GCustomerGrpcClient {
  addActsGeneralCusromerReference(data: {
    actId: string;
    contractorId: string;
  }): Observable<void>;
  getGCustomersLabel({ id: string }): Observable<{ label: string }>
}

interface LabGrpcClient {
  addActsLabReference(data: {
    actId: string;
    contractorId: string;
  }): Observable<void>;
  getLabsLabes({id: string}): Promise<{ label: string }>
}

@Injectable()
export class ActsService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  private customerGrpcClient: CustomerGrpcClient;
  private gcustomerGrpcClient: GCustomerGrpcClient;
  private labGrpcClient: LabGrpcClient;

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly gcustomerRepository: GCustomerRepository,
    private readonly labRepository: LabRepository,
    private readonly docRepositroy: DocRepository,
    @Inject('CUSTOMER_PACKAGE') private readonly customerClient: ClientGrpc,
    @Inject('GCUSTOMER_PACKAGE') private readonly gCustomerClient: ClientGrpc,
    @Inject('LAB_PACKAGE') private readonly labClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.customerGrpcClient = this.customerClient.getService<
      CustomerGrpcClient
    >('MigrationService');
    this.gcustomerGrpcClient = this.gCustomerClient.getService<
      GCustomerGrpcClient
    >('MigrationService');
    this.labGrpcClient = this.labClient.getService<LabGrpcClient>(
      'MigrationService',
    );
  }

  async createActFromMigration(act: MigrationCreateActDto): Promise<Act> {
    this.logger.verbose('inside migration method of `ActsService`');
    const lab = await this.labRepository.findOne(act.lab);
    const customer = await this.customerRepository.findOne(act.customer);
    const gcustomer = await this.gcustomerRepository.findOne(
      act.generalCustomer,
    );
    this.logger.log(`lab, customer, gc: ${lab}, ${customer}, ${gcustomer} `);
    if (!lab) {
      const newLab = this.labRepository.create({ id: act.lab });
      this.logger.log(`newlab: ${newLab}`);
      await this.labRepository.save(newLab);
    }
    if (!customer) {
      const newCustomer = this.customerRepository.create({ id: act.customer });
      this.logger.log(`newcustomer: ${newCustomer}`);
      await this.customerRepository.save(newCustomer);
    }
    if (!gcustomer) {
      const newGC = this.gcustomerRepository.create({
        id: act.generalCustomer,
      });
      this.logger.log(`newgc: ${newGC}`);
      await this.gcustomerRepository.save(newGC);
    }
    const newAct = await this.actRepository.migrationCreateAct(act);

    return await this.addReferencesToAct(newAct, act);
  }

  async addReferencesToAct(
    newAct: Act,
    act: MigrationCreateActDto,
  ): Promise<Act> {
    newAct.customer = await this.customerRepository.findOne(act.customer);
    newAct.general_customer = await this.gcustomerRepository.findOne(
      act.generalCustomer,
    );
    newAct.lab = await this.labRepository.findOne(act.lab);
    this.logger.log(`after references ${JSON.stringify(newAct, null, 2)}`);
    return await this.actRepository.save(newAct);
  }

  async findAct(id: string): Promise<Act> {
    return await this.actRepository.findOne(id);
  }

  async findCustomer(id: string): Promise<Customer> {
    return await this.customerRepository.findOne(id);
  }

  async findGCustomer(id: string): Promise<GeneralCustomer> {
    return await this.gcustomerRepository.findOne(id);
  }

  async findLab(id: string): Promise<Lab> {
    return await this.labRepository.findOne(id);
  }

  async getContractors(customerId: string, gcustomerId: string, labId: string) {
    this.logger.verbose('get-contractors.method');

    try {
      let customer = await this.findCustomer(customerId);

      if (!customer) {
        customer = this.customerRepository.create({ id: customerId })
        await this.customerRepository.save(customer)
      }

      let gcustomer = await this.findGCustomer(gcustomerId);

      if (!gcustomer) {
        gcustomer = this.gcustomerRepository.create({ id: gcustomerId })
        await this.gcustomerRepository.save(gcustomer)
      }

      let lab = await this.findLab(labId);

      if (!lab) {
        lab = this.labRepository.create({ id: labId })
        await this.labRepository.save(lab)
      }

      return { customer, gcustomer, lab };
    } catch (e) {
      this.logger.error(e);
    }
  }

  async sendContractors(
    actId: string,
    customerId: string,
    gcustomerId: string,
    labId: string,
  ): Promise<void> {
    this.logger.verbose('send-contractors.method');

    try {
      this.customerGrpcClient
        .addActsCusromerReference({ actId: actId, contractorId: customerId })
        .subscribe(() => this.logger.log('reference was send to a customer'));

      this.gcustomerGrpcClient
        .addActsGeneralCusromerReference({
          actId: actId,
          contractorId: gcustomerId,
        })
        .subscribe(() =>
          this.logger.log('referece was sent to a general customer'),
        );

      this.labGrpcClient
        .addActsLabReference({ actId: actId, contractorId: labId })
        .subscribe(() => this.logger.log('referece was send to lab'));
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getCusomersLabel(id: string): Promise<{ label: string }> {
    this.logger.verbose('get-customer`s label.method');
    try {
      return await this.customerGrpcClient.getCustomersLabel({ id }).toPromise()
    } catch (e) {
      this.logger.error(e);
    }
  }


  async getGCustomersLabel(id: string): Promise<{ label: string }> {
    this.logger.verbose('get-gcusomer`s label.method')
    try {
      return await this.gcustomerGrpcClient.getGCustomersLabel({id}).toPromise()
    } catch(e) {
      this.logger.error(e)
    }
  }

  async getLabsLabel(id: string): Promise<{ label: string }> {
    this.logger.verbose('get-lab`s label.method')
    try {
      return await this.labGrpcClient.getLabsLabes({id})
    } catch(e) {
      this.logger.error(e)
    }
  }

  // async sendContractors(
  //   actId: string,
  //   customerId: string,
  //   gcustomerId: string,
  //   labId: string,
  // ): Promise<void> {
  //   this.logger.verbose('send-contractors.method');

  //   try {
  //     this.customerGrpcClient
  //       .addActsCusromerReference({ actId: actId, contractorId: customerId })
  //       .subscribe(() => this.logger.log('reference was send to a customer'));

  //     this.gcustomerGrpcClient
  //       .addActsGeneralCusromerReference({
  //         actId: actId,
  //         contractorId: gcustomerId,
  //       })
  //       .subscribe(() =>
  //         this.logger.log('referece was sent to a general customer'),
  //       );

  //     this.labGrpcClient
  //       .addActsLabReference({ actId: actId, contractorId: labId })
  //       .subscribe(() => this.logger.log('referece was send to lab'));
  //   } catch (e) {
  //     this.logger.error(e);
  //   }
  // }

  async getActByIdOfCustomer(cusomerId: string, actId: string): Promise<Act> {
    this.logger.verbose('get-act-by-id-of-customer.method');

    return await this.actRepository.findOne(actId)
  }

  async addDocToAct(actId: string, docId: string): Promise<void> {
    this.logger.verbose('add-doc-to-act.method')

    try{
      const act = await this.actRepository.findOne(actId)

      const doc = this.docRepositroy.create({ id: docId, act: act })

      await this.docRepositroy.save(doc)

    } catch(e) {
      this.logger.error(e)
    }
  }
}
