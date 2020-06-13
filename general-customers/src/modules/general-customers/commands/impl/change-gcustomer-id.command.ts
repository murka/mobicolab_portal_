export class ChangeGCustomerIdCommand {
    constructor(public readonly newId: string, public readonly oldId: string) {}
}