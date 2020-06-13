import { ChangeCustomerIdHandler } from "./change-customer-id.handler";
import { AddActHandler } from "./add-act.handler";
import { CreateCustomerHandler } from "./create-customer.handler";
import { UpdateCustomerHandler } from "./update-customer.handler";

export const CommandsHandlers = [
    ChangeCustomerIdHandler,
    AddActHandler,
    CreateCustomerHandler,
    UpdateCustomerHandler
]