import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcGeneralCustomersClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'api_general_customers:50054',
    package: 'gcustomer_service',
    protoPath: '/proto/general-customer/general-customer.proto',
  },
};
