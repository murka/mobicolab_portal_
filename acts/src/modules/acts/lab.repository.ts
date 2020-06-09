import { EntityRepository, Repository } from "typeorm";
import { Lab } from "./models/lab.model";

@EntityRepository(Lab)
export class LabRepository extends Repository<Lab> {
  async findLab(id: string) {
    return await this.findOne(id)
  }

  async getActsOfLabs(labId: string) {
    return (await this.findOne(labId)).acts
  }

  async createLab(labId: string) {
    const newLab = new Lab();
    newLab.id = labId;
    return await newLab
  }

  async migrationCreate(id: string) {
    const newItem = new Lab()
    newItem.id = id
    return await newItem
  }
}