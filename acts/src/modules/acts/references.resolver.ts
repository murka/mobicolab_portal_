import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { Act } from './models/act.model';
import { GeneralCustomer } from './models/general-customer.model';
import { Lab } from './models/lab.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetActsOfCustomerCommand,
  GetActsOfGCustomerCommand,
  GetActsOfLabCommand,
} from './commands/impl/get-acts-reference';
import { Doc } from './models/doc.model';
import { Logger } from '@nestjs/common';
import { TypeOfSample } from './models/type-of-sample.model';
import { GetActsOfTypeOfSampleQuery } from './queries/impl/get-acts-of-type-of-sample.query';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() customer: Customer): Promise<Act[]> {
    return await this.commandBus.execute(
      new GetActsOfCustomerCommand(customer.id),
    );
  }
}

@Resolver(of => GeneralCustomer)
export class GCustomerResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @ResolveField(of => [Act])
  public async acts(
    @Parent() general_customer: GeneralCustomer,
  ): Promise<Act[]> {
    return await this.commandBus.execute(
      new GetActsOfGCustomerCommand(general_customer.id),
    );
  }
}

@Resolver(of => Lab)
export class LabResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @ResolveField(of => [Act])
  public async acts(@Parent() lab: Lab): Promise<Act[]> {
    return await this.commandBus.execute(new GetActsOfLabCommand(lab.id));
  }
}

@Resolver(of => Doc)
export class DocResolver {
  logger = new Logger(this.constructor.name);

  // constructor(private readonly) {}
}

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField(of => [Act])
  async acts(@Parent() typeOfSample: TypeOfSample): Promise<Act[]> {
    try {
      return await this.queryBus.execute(
        new GetActsOfTypeOfSampleQuery(typeOfSample.id),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
