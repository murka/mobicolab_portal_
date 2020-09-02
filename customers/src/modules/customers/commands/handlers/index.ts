import { AddActHandler } from './add-act.handler';
import { CreateCustomerHandler } from './create-customer.handler';
import { UpdateCustomerHandler } from './update-customer.handler';
import { UpdateActHandler } from './update-act.handler';

export const CommandsHandlers = [
  AddActHandler,
  CreateCustomerHandler,
  UpdateCustomerHandler,
  UpdateActHandler,
];
