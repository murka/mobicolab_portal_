import { CopyAppDto } from '../../models/dto/copy-app.dto';

export class CreateAppCopyCommand {
  constructor(public copyAppData: CopyAppDto) {}
}
