import { EntityRepository, Repository } from "typeorm";
import { Doc } from "./models/doc.model";
import { Logger } from "@nestjs/common";

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
    logger = new Logger(this.constructor.name)
}