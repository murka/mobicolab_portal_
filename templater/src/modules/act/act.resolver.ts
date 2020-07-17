import { Resolver, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver('Act-Templater')
export class ActResolver {
    logger = new Logger(this.constructor.name)

    constructor() {}

    // @Mutation(returns => )
}
