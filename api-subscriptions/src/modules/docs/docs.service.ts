import { Injectable, Logger, Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { DocRepository } from './doc.repository';

@Injectable()
export class DocsService {
    logger = new Logger(this.constructor.name)

    constructor(@Inject('PUB_SUB') private readonly pubsub: PubSub, private readonly dr: DocRepository) {}

    async publishDoc(docId: string, actId: string, mutation: string): Promise<void> {
        const doc = await this.dr.findOne(docId)

        this.pubsub.publish(`Act_${actId}_added`, {
            changeDocs: { mutation: mutation, data: doc }
        })
    }
}
