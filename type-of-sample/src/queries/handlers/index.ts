import { GetAllHabitansHandler } from './get-all-habitans.handler';
import { GetHabitansTypesByParentQuery } from '../impl/get-habitans-types-by-parent.query';

export const QueryHandlers = [
  GetAllHabitansHandler,
  GetHabitansTypesByParentQuery,
];
