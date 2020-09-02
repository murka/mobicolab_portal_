"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfSampleRepository = void 0;
const typeorm_1 = require("typeorm");
const type_of_sample_model_1 = require("../models/type-of-sample.model");
const common_1 = require("@nestjs/common");
let TypeOfSampleRepository = class TypeOfSampleRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getTypeOfSampleById(id) {
        this.logger.verbose('get-type-of-sample-by-id.method');
        try {
            const tos = await this.findOne(id);
            if (!tos) {
                throw new common_1.NotFoundException();
            }
            return tos;
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
TypeOfSampleRepository = __decorate([
    typeorm_1.EntityRepository(type_of_sample_model_1.TypeOfSample)
], TypeOfSampleRepository);
exports.TypeOfSampleRepository = TypeOfSampleRepository;
//# sourceMappingURL=type-of-sample.repository.js.map