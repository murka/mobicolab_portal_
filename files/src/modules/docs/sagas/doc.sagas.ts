import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SavedDocEvent } from '../events/impl/saved-doc.event';
import { PushDocByTypeCommand } from '../commands/impl/push-doc-by-type.command';

const logger = new Logger('DocSaga');

@Injectable()
export class DocSagas {
  @Saga()
  pushingDocsSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SavedDocEvent),
      map(event => {
        logger.verbose(`pushing doc saga`);
        return new PushDocByTypeCommand(event.aggregationId, event.doc.title);
      }),
    );
  };
}
