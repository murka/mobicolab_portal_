import { AddActHanler } from './add-act.handler';
import { CreateGeneralCustomerHandler } from './create-gcustomer.handler';
import { UpdateGeneralCustomerHandler } from './update-gcustomer.handler';
import { UpdateActHandler } from './update-act.handler';

export const CommandHandlers = [
  AddActHanler,
  CreateGeneralCustomerHandler,
  UpdateGeneralCustomerHandler,
  UpdateActHandler,
];
