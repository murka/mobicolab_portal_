/* eslint-disable */
import { Empty } from './google/protobuf/empty';


export interface NewDoc {
  actId: string;
  file: Uint8Array;
}

export interface FilesService {

  PushNewDoc(request: NewDoc): Promise<Empty>;

  PushNewPdf(request: NewDoc): Promise<Empty>;

}
