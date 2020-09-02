import { Resolver, Subscription, Args, Query } from '@nestjs/graphql';
import { Logger, Inject } from '@nestjs/common';
import { DocSubscriptionsPayload } from './models/doc-subscription-payload.model';
import { PubSub } from 'graphql-subscriptions';
import { Doc } from './models/doc.model';
import { DocsService } from './docs.service';
import { Observable } from 'rxjs';

@Resolver('Docs')
export class DocsResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
    private readonly ds: DocsService,
  ) {}

  @Query(returns => [Doc], { nullable: true })
  getDocs(@Args('id') id: string): Observable<Doc[]> {
    this.logger.verbose('get-docs');

    try {
      return this.ds.getDocs(id).pipe(data => {
        data.subscribe(d => this.logger.log(d));
        return data;
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Subscription(returns => Doc)
  async changeDocs(@Args({ name: 'actId', type: () => String }) actId: string) {
    this.logger.verbose('subscription addDoc');

    try {
      return this.pubsub.asyncIterator(`Act_${actId}_added`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
