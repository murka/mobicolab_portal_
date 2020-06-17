import { NewActHandler } from "./new-act.handler";
import { GetActsOfCustomerHadler, GetActsOfGCustomerHandler, GetActsOfLabHandler } from "./get-acts-reference";
import { ChangeCustomerIdHandler, ChangeGeneralCustomerIdHandler, ChangeLabIdHandler } from "./migrations.handler";
import { AddActsReferencesHandler } from "./add-acts-references.handler";
import { UpdateActHandler } from "./update-act.handler";

export const CommandHadlers = [
    NewActHandler,
    GetActsOfCustomerHadler,
    GetActsOfGCustomerHandler,
    GetActsOfLabHandler,
    ChangeCustomerIdHandler,
    ChangeGeneralCustomerIdHandler,
    ChangeLabIdHandler,
    AddActsReferencesHandler,
    UpdateActHandler
]