import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { ActCreatedEvent } from '../events/impl/act-created.event';
import { map } from 'rxjs/operators';
import { AddActToContractorsCommand } from '../commands/impl/add-act-to-contractors.command';

@Injectable()
export class ReferencesSaga {
  @Saga()
  actCreated = (
    events$: Observable<ActCreatedEvent>,
  ): Observable<ICommand> => {
      return events$.pipe(
          map((event) => {
              return new AddActToContractorsCommand(event.actId)
          })
      )
  };
}
