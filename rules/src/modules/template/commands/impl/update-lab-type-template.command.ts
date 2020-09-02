import { NewLabTypeOfSampleTemplate } from '../../models/dto/new-lab-type-of-sample-template.dto';

export class UpdateLabTypeTemplateCommand {
  constructor(public readonly data: NewLabTypeOfSampleTemplate) {}
}
