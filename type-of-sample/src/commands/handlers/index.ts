import { CreateHabitanHandler } from './create-habitan.handler';
import { UpdateHabitanHandler } from './update-habitan.handler';
import { CreateHabitansTypeHandler } from './create-habitans-type.handler';
import { UpdateHabitansTypeHandler } from './update-habitans-type.handler';

export const CommandHandlers = [
  CreateHabitanHandler,
  UpdateHabitanHandler,
  CreateHabitansTypeHandler,
  UpdateHabitansTypeHandler,
];
