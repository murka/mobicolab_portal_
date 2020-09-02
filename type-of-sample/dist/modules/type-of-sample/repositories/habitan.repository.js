"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitanRepository = void 0;
const typeorm_1 = require("typeorm");
const habitan_model_1 = require("../models/habitan.model");
const common_1 = require("@nestjs/common");
let HabitanRepository = class HabitanRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getAllHabitan() {
        this.logger.verbose('get-all-habitan.method');
        try {
            const habitans = await this.find();
            if (!habitans) {
                throw new common_1.NotFoundException();
            }
            return habitans;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async newHabitan(label) {
        this.logger.verbose('new-habitan.method');
        try {
            const newHabitan = this.create({ label: label });
            return await this.save(newHabitan);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async updateHabitan(id, label) {
        this.logger.verbose('new-habitan.method');
        try {
            const habitan = await this.findOne(id);
            habitan.label = label;
            return await this.save(habitan);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async getHabitansTypesByParent(id) {
        this.logger.verbose('get-habitans-types-by-parent.method');
        try {
            const habitan = await this.findOne(id);
            return habitan.htypes;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
HabitanRepository = __decorate([
    typeorm_1.EntityRepository(habitan_model_1.Habitan)
], HabitanRepository);
exports.HabitanRepository = HabitanRepository;
//# sourceMappingURL=habitan.repository.js.map