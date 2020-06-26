import { Injectable, Logger } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { DroppedDocEvent } from '../events/impl/dropped-doc.event';
import { UploadDocCommand } from '../commands/impl/upload-doc.command';

const logger = new Logger('DocSaga')

@Injectable()
export class DocSagas {
  @Saga()
  docDropped = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DroppedDocEvent),
      map((event) => {
        logger.verbose(`executig create-path.command by event: ${DroppedDocEvent.name}`)
        return new UploadDocCommand(event.actId, event.file, event.docId);
      }),
    );
  };

  // @Saga()
  // newDoc = (
  //   upload$: Observable<any>,
  //   saved$: Observable<any>,
  // ): Observable<ICommand> => {
  //   return saved$.pipe(
  //     ofType(SavedDocEvent),
  //     mergeMap(saved =>
  //       upload$.pipe(
  //         ofType(UploadDocEvent),
  //         filter(upload => saved.docId === upload.docId),
  //         map(upload => {
  //           return new NewDocCommand(upload.docId);
  //         }),
  //       ),
  //     ),
  //   );
  // };
}
