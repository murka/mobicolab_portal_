import { UploadDocHandler } from './upload-doc.handler';
import { DroppingDocHandler } from './dropping-doc.handler';
import { NewDocHandler } from './new-doc.handler';
import { RemoveDocHandler } from './removed-doc.handler';
import { TitlingDocHandler } from "./titling-doc.handler";
import { SavingDocHandler } from './saving-doc.handler';
import { DeletingDocHandler } from './deleting-doc.handler';
import { DownloadingDocHandler } from './downloading-doc.handler';
import { SavingAllDocsHandler } from './saving-all-docs.handler';

export const CommandHandlers = [
  UploadDocHandler,
  DroppingDocHandler,
  NewDocHandler,
  RemoveDocHandler,
  TitlingDocHandler, 
  SavingDocHandler, 
  DeletingDocHandler,
  DownloadingDocHandler,
  SavingAllDocsHandler
];
