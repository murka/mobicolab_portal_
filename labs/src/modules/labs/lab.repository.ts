import { EntityRepository, AbstractRepository } from "typeorm";
import { Lab } from "./models/lab.model";
import { Act } from "./models/act.model";

@EntityRepository(Lab)
export class LabRepository extends AbstractRepository<Lab> {
    public async findAll(): Promise<Lab[]> {
        return await this.repository.find()
    }

    public async findLab(id: string): Promise<Lab> {
        return await this.repository.findOne(id)
    }

    createLab(lab: Lab): Lab {
        return this.repository.create(lab);
    }
}

@EntityRepository(Act)
export class ActRepository extends AbstractRepository<Act> {
    public async getLab(id): Promise<Lab> {
        return (await this.repository.findOne(id)).lab
    }
}