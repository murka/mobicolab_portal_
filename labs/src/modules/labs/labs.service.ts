import { Injectable, Logger } from '@nestjs/common';
import { LabRepository } from './lab.repository';

@Injectable()
export class LabsService {
    logger = new Logger(this.constructor.name)

    constructor(private readonly labRepositoty: LabRepository) {}

    async getLabsLabel(id: string): Promise<{ label: string }> {
        this.logger.verbose('get-lab`s-label.method')

        try{
            const lab = await this.labRepositoty.findOne(id)

            return { label: lab.label }
        } catch(e) {
            this.logger.error(e)
        }
    }
}
