import {
  Controller,
  Get,
  Param,
  Logger,
  Res,
} from '@nestjs/common';
import { Response } from 'express'
import { CommandBus } from '@nestjs/cqrs';
import { DownloadingDocCommand } from './commands/impl/downloading-doc.command';
import { GrpcMethod } from '@nestjs/microservices';
import fs, { ReadStream, createReadStream, readFileSync } from 'fs';
import path, { dirname } from 'path';
import { Observable, from, of, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';

const logger = new Logger('docsController');

export interface AllFiles {
  lab: string,
  type: string,
  file: ReadStream
}

@Controller('docs')
export class DocsController {
  constructor(private commandBus: CommandBus) {}

  // @Post('create/:id/:type/:status')
  // @UseInterceptors(FileInterceptor('file'))
  // async createDoc(
  //   @UploadedFile() file,
  //   @Param('id') id: string,
  //   @Param('type') type: string,
  //   @Param('status') status: string,
  // ): Promise<any> {
  //   logger.verbose(
  //     `File ${file.originalname} by type ${type} uploaded and save in act with id:${id}. Status ${status} updated`,
  //   );
  //   return await this.ds.uploadFile(id, file, type, status);
  // }

  // @Patch('delete/:id')
  // async deleteDoc(@Param('id') id: string, @Body() body): Promise<any> {
  //   logger.verbose(body)
  //   return this.ds.deleteFile(id, body);
  // }

  @Get('download/:actId/:docId')
  async downloadDoc(@Param('actId') actId: string, @Param('docId') docId: string, @Res() res: Response): Promise<Response> {
    logger.verbose('download doc request')
    const file = await this.commandBus.execute(new DownloadingDocCommand(actId, docId))
    return file.pipe(res)
  }

  @GrpcMethod('TemplatePreview')
  getAllFiles(): Observable<AllFiles> {
    logger.verbose('get-all-files.method')

    const allFiles: AllFiles[] = []

    const file = createReadStream(path.join(__dirname, '../../../assets/pdf/mobicolab/air.pdf'))

    let allFiles$ = new ReplaySubject<any>();

    allFiles$.next({ lab: 'mobicolab',
     type: 'air',
      file: file 
    })

    allFiles$.next({
      lab: 'mobicolab',
      type: 'soil',
      file: file
    })

    allFiles$.complete()

    // allFiles.push({ lab: 'mobicolab', type: 'air', file: file })

    // logger.log(file)

    return allFiles$.asObservable()
  }
}
