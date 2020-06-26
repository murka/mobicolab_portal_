import { GetAllDocsOfActQuery } from "../impl/get-all-docs-of-act.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { Doc } from "../../models/doc.model";
import { DocRepository } from "../../doc.repository";

@QueryHandler(GetAllDocsOfActQuery)
export class GetAllDocsOfActHandler implements IQueryHandler<GetAllDocsOfActQuery> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly docRepository: DocRepository) {}

    async execute(query: GetAllDocsOfActQuery): Promise<Doc[]> {
        this.logger.verbose('get-all-docs-of-acts.query')

        const { actIds } = query

        try{
            return await this.docRepository.findByIds(actIds)
        } catch(e) {
            this.logger.error(e)
        }
    }
}
