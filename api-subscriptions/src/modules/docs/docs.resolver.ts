import { Resolver, Subscription, Args, Query } from '@nestjs/graphql';
import { Logger, Inject } from '@nestjs/common';
import { DocSubscriptionsPayload } from './models/doc-subscription-payload.model';
import { PubSub } from 'graphql-subscriptions';
import { Doc } from './models/doc.model';

@Resolver('Docs')
export class DocsResolver {
  logger = new Logger(this.constructor.name);

  constructor(@Inject('PUB_SUB') private readonly pubsub: PubSub) {}

  @Query(returns => Doc)
  async first(): Promise<void> {}

  @Subscription(returns => DocSubscriptionsPayload)
  async changeDocs(@Args({ name: 'actId', type: () => String }) actId: string) {
    this.logger.verbose('subscription addDoc');
    return this.pubsub.asyncIterator(`Act_${actId}_added`);
  }
}
