export class GetActsOfCustomerCommand {
    constructor(public readonly customerId: string) {}
}

export class GetActsOfGCustomerCommand {
    constructor(public readonly gcustomerId: string) {}
}

export class GetActsOfLabCommand {
    constructor(public readonly labId: string) {}
}