import { Controller, Logger } from '@nestjs/common';
import {
  ApiGatewayServiceController,
  ApiGatewayServiceControllerMethods,
  SavingData,
  docId,
  File,
} from 'src/models/build/api-gateway/api-gateway';
import { Observable } from 'rxjs';
import { FilesService } from './files.service';
import { map } from 'rxjs/operators';

@Controller('files')
@ApiGatewayServiceControllerMethods()
export class FilesController implements ApiGatewayServiceController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly filesService: FilesService) {}

  savingDoc(data: SavingData): Observable<any> {
    this.logger.verbose('saving-doc.method');

    try {
      return this.filesService.savingFile(data).pipe(
        map(data => {
          console.error(data);
          return data;
        }),
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  downloadDoc(data: docId): Promise<File> {
    this.logger.verbose('download-file');

    try {
      return this.filesService.downloadFile(data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
