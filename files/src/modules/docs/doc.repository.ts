import { EntityRepository, Repository } from "typeorm";
import { Doc } from "./models/doc.model";
import { Logger } from "@nestjs/common";
import { Act } from "./models/act.model";

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
    logger = new Logger(this.constructor.name)
}

@EntityRepository(Act)
export class ActRepository extends Repository<Act> {
    logger = new Logger(this.constructor.name)
}