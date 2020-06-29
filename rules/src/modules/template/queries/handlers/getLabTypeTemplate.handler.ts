import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetLabTypeTemplateQuery } from "../impl/getLabTypeTemplate.query";
import { Logger } from "@nestjs/common";
import { LabTypeTemplateRepository } from "../../template.repository";

@QueryHandler(GetLabTypeTemplateQuery)
export class GetLabTypeTemplateHandler implements IQueryHandler<GetLabTypeTemplateQuery> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly ltRepository: LabTypeTemplateRepository) {}

    async execute(query: GetLabTypeTemplateQuery): Promise<GetLabTypeTemplateQuery> {
        this.logger.verbose('get-lab-type-template.query')

        const { labId, typeOfSampleId } = query

        return await this.ltRepository.findOne({ labId: labId, typeOfSampleId: typeOfSampleId })
    }
}