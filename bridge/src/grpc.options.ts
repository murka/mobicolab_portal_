import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50050',
    package: ['act', 'customer', 'gcustomer', 'lab'],
    protoPath: [
      join(__dirname, 'modules/acts/act.proto'),
      join(__dirname, 'modules/customers/customer.proto'),
      join(__dirname, 'modules/general-customers/gcustomer.proto'),
      join(__dirname, 'modules/labs/lab.proto'),
    ],
  },
};
