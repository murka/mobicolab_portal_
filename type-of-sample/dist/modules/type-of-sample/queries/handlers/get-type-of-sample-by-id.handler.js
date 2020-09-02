"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTypeOfSampleByIdHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_type_of_sample_by_id_query_1 = require("../impl/get-type-of-sample-by-id.query");
const common_1 = require("@nestjs/common");
const type_of_sample_repository_1 = require("../../repositories/type-of-sample.repository");
let GetTypeOfSampleByIdHandler = class GetTypeOfSampleByIdHandler {
    constructor(tosRepository) {
        this.tosRepository = tosRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async execute(query) {
        this.logger.verbose('get-type-of-sample.query');
        const { id } = query;
        try {
            return await this.tosRepository.findOne(id);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
GetTypeOfSampleByIdHandler = __decorate([
    cqrs_1.QueryHandler(get_type_of_sample_by_id_query_1.GetTypeOfSampleByIdQuery),
    __metadata("design:paramtypes", [type_of_sample_repository_1.TypeOfSampleRepository])
], GetTypeOfSampleByIdHandler);
exports.GetTypeOfSampleByIdHandler = GetTypeOfSampleByIdHandler;
//# sourceMappingURL=get-type-of-sample-by-id.handler.js.map