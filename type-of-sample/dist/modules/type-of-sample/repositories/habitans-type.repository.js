"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitansTypeRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const habitans_type_model_1 = require("../models/habitans-type.model");
let HabitansTypeRepository = class HabitansTypeRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async createHabitansType(label) {
        this.logger.verbose('create-habitans-type.method');
        try {
            const ht = this.create({ label: label });
            return await this.save(ht);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async updateHabitansType(id, label) {
        this.logger.verbose('update-habitans-type.method');
        try {
            const ht = await this.findOne(id);
            ht.label = label;
            return await this.save(ht);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
HabitansTypeRepository = __decorate([
    typeorm_1.EntityRepository(habitans_type_model_1.HabitansType)
], HabitansTypeRepository);
exports.HabitansTypeRepository = HabitansTypeRepository;
//# sourceMappingURL=habitans-type.repository.js.map