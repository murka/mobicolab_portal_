import { ChangeIdDto } from "../../acts.controller";

export class ChangeCustomerIdCommand {
    constructor(public readonly data: ChangeIdDto) {}
}

export class ChangeGeneralCustomerIdCommand {
    constructor(public readonly data: ChangeIdDto) {}
}

export class ChangeLabIdCommand {
    constructor(public readonly data: ChangeIdDto) {}
}