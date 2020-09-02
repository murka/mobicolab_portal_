import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { PdfTemplater } from './models/pdf-temlater.model';
import { CreatorService } from './creator.service';

@Resolver('Act-Templater')
export class ActResolver {
  logger = new Logger(this.constructor.name);

  constructor(private readonly creatorService: CreatorService) {}

  @Mutation(returns => PdfTemplater, { nullable: true })
  async createPdf(@Args('actId') actId: string, @Args('path') path: string) {
    this.logger.verbose('create-pdf');

    try {
      await this.creatorService.createDoc(actId, path);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
