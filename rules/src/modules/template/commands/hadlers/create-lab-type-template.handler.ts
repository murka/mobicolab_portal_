import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateLabTypeTemplateCommand } from '../impl/create-lab-type-template.command'
import { Logger } from "@nestjs/common";
import { LabTypeOfSampleTemplateModel } from "../../models/lab-type-of-sample.model";
import { LabTypeTemplateRepository } from "../../template.repository";

@CommandHandler(CreateLabTypeTemplateCommand)
export class CreateLabTypeTemplateHandler implements ICommandHandler<CreateLabTypeTemplateCommand> {
    logger = new Logger(this.constructor.name)

    constructor(private readonly ltRepository: LabTypeTemplateRepository) {}

    async execute(command: CreateLabTypeTemplateCommand): Promise<LabTypeOfSampleTemplateModel> {
        this.logger.verbose('create-lab-type-template.command')

        const { labId, typeId, path } = command

        const lt =  this.ltRepository.create({ labId: labId, typeOfSampleId: typeId, path: path })

        return await this.ltRepository.save(lt)
    }
}