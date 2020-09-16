import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcCustomerClient } from '../../options/grpc-cutstomer-client';
import {
  CustomerServiceClient,
  Customer,
} from '../../models/build/customer/customer';
import { Act, ActServiceClient } from 'src/models/build/act/act';
import { grpcActClient } from 'src/options/grpc-act-client';
import { grpcGeneralCustomersClient } from 'src/options/grpc-general-customer-client';
import {
  GeneralCustomerServiceClient,
  GeneralCustomer,
} from 'src/models/build/general-customer/gneral-customer';
import { grpcLabClient } from 'src/options/grpc-lab-client';
import { LabServiceClient, Lab } from 'src/models/build/lab/lab';
import { grpcTOSClient } from 'src/options/grpc-tos-client';
import { TosServiceClient, Tos, TOS_SERVICE_NAME } from 'src/models/build/tos/tos';

@Injectable()
export class ActService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  @Client(grpcActClient)
  private readonly actClient: ClientGrpc;

  @Client(grpcCustomerClient)
  private readonly customerClient: ClientGrpc;

  @Client(grpcGeneralCustomersClient)
  private readonly generalCustomerClient: ClientGrpc;

  @Client(grpcLabClient)
  private readonly labClient: ClientGrpc;

  @Client(grpcTOSClient)
  private readonly tosClient: ClientGrpc;

  private grpcActService: ActServiceClient;

  private grpcCustomerService: CustomerServiceClient;

  private grpcGeneralCustomerService: GeneralCustomerServiceClient;

  private grpcLabService: LabServiceClient;

  private grpcTosService: TosServiceClient;

  constructor() {}

  onModuleInit() {
    this.grpcActService = this.actClient.getService<ActServiceClient>(
      'ActService',
    );
    this.grpcCustomerService = this.customerClient.getService<
      CustomerServiceClient
    >('CustomerService');
    this.grpcGeneralCustomerService = this.generalCustomerClient.getService<
      GeneralCustomerServiceClient
    >('GeneralCustomerService');
    this.grpcLabService = this.labClient.getService<LabServiceClient>(
      'LabService',
    );
    this.grpcTosService = this.tosClient.getService<TosServiceClient>(
      TOS_SERVICE_NAME,
    );
  }

  async getCustomerForPdf(customerId: string): Promise<Customer> {
    this.logger.verbose('get-customer-for-pdf.method');

    try {
      return await this.grpcCustomerService
        .getCustomer({ id: customerId })
        .toPromise();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getGeneralCustomerForPdf(
    gcustomerId: string,
  ): Promise<GeneralCustomer> {
    this.logger.verbose('get-gcustomer-for-pdf.method');

    try {
      return await this.grpcGeneralCustomerService
        .getGeneralCustomer({ id: gcustomerId })
        .toPromise();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async getLabForPdf(labId: string): Promise<Lab> {
    this.logger.verbose('get-lab-for-pdf.method');

    try {
      return await this.grpcLabService.getLab({ id: labId }).toPromise();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async getTosForPdf(htypeId: string, habitanId: string): Promise<Tos> {
    this.logger.verbose('get-tos-for-pdf.method');

    try {
      return await this.grpcTosService
        .getTos({ htypeId, habitanId })
        .toPromise();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async getActForPdf(actId: string): Promise<Act> {
    this.logger.verbose('get-act-for-pdf.method');

    try {
      return this.grpcActService.getAct({ id: actId }).toPromise();
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
