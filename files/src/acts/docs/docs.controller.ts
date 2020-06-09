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

const logger = new Logger('docsController');

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
}
