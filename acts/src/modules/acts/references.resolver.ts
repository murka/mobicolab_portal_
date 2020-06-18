import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { Act } from './models/act.model';
import { GeneralCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { CommandBus } from '@nestjs/cqrs';
import { GetActsOfCustomerCommand, GetActsOfGCustomerCommand, GetActsOfLabCommand } from './commands/impl/get-acts-reference';
import { ActsService } from './acts.service';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly as: ActsService,
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() customer: Customer): Promise<Act[]> {
    return await this.commandBus.execute(new GetActsOfCustomerCommand(customer.id))
  }

  @ResolveField(of => Act)
  public async act(@Parent() customer: Customer, @Args('actId') actId: string): Promise<Act> {
    return await this.as.getActByIdOfCustomer(customer.id, actId)
  }
}

@Resolver(of => GeneralCustomer)
export class GCustomerResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() general_customer: GeneralCustomer): Promise<Act[]> {
    return await this.commandBus.execute(new GetActsOfGCustomerCommand(general_customer.id))
  }
}

@Resolver(of => Lab)
export class LabResolver {
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() lab: Lab): Promise<Act[]> {
    return await this.commandBus.execute(new GetActsOfLabCommand(lab.id))
  }
}
