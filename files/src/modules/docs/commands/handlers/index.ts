import { UploadDocHandler } from './upload-doc.handler';
import { DroppingDocHandler } from './dropping-doc.handler';
import { NewDocHandler } from './new-doc.handler';
import { TitlingDocHandler } from './titling-doc.handler';
import { SavingDocHandler } from './saving-doc.handler';
import { DownloadingDocHandler } from './downloading-doc.handler';
import { RemoveDocHandler } from './remove-doc.handler';
import { AddActHandler } from './add-act.handler';
import { PushDocByTypeHandler } from './push-doc-by-type.handler';

export const CommandHandlers = [
  UploadDocHandler,
  DroppingDocHandler,
  NewDocHandler,
  TitlingDocHandler,
  SavingDocHandler,
  DownloadingDocHandler,
  RemoveDocHandler,
  AddActHandler,
  PushDocByTypeHandler,
];
