import { NewActHandler } from './new-act.handler';
import { UpdateActHandler } from './update-act.handler';
import { CreateAppHandler } from './create-app.handler';
import { DeleteAppHandler } from './delete-app.handler';
import { CreateAppCopyHandler } from './create-app-copy.handler';
import { ChangeStatusHandler } from './change-status.handler';

export const CommandHadlers = [
  NewActHandler,
  UpdateActHandler,
  CreateAppHandler,
  DeleteAppHandler,
  CreateAppCopyHandler,
  ChangeStatusHandler,
];
