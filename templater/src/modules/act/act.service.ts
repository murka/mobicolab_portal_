import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { grpcCustomerClient } from '../../options/grpc-cutstomer-client';
import {
  CustomerServiceClient,
  Customer,
} from '../../models/build/customer/customer';
import { Act, ActServiceClient } from 'src/models/build/act/act';
import { grpcActClient } from 'src/options/grpc-act-client';

@Injectable()
export class ActService implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  @Client(grpcCustomerClient)
  private readonly customerClient: ClientGrpc;

  @Client(grpcActClient)
  private readonly actClient: ClientGrpc;

  private grpcCustomerService: CustomerServiceClient;

  private grpcActService: ActServiceClient;

  constructor() {}

  onModuleInit() {
    this.grpcCustomerService = this.customerClient.getService<
      CustomerServiceClient
    >('CustomerService');
    this.grpcActService = this.actClient.getService<ActServiceClient>(
      'ActService',
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

  async getActForPdf(actId: string): Promise<Act> {
    this.logger.verbose('get-act-for-pdf.method');

    try {
      return this.grpcActService.getAct({ id: actId }).toPromise();
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
