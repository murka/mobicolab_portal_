export class ChangeCustomerIdCommand {
    constructor(public readonly newId: string, public readonly oldId: string) {}
}