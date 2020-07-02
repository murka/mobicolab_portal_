import { EntityRepository, Repository } from "typeorm";
import { LabTypeOfSampleTemplateModel } from "./models/lab-type-of-sample.model";

@EntityRepository(LabTypeOfSampleTemplateModel)
export class LabTypeTemplateRepository extends Repository<LabTypeOfSampleTemplateModel> {}