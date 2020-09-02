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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfSampleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const type_of_sample_model_1 = require("../models/type-of-sample.model");
const common_1 = require("@nestjs/common");
const type_of_sample_repository_1 = require("../repositories/type-of-sample.repository");
const cqrs_1 = require("@nestjs/cqrs");
const get_type_of_sample_by_id_query_1 = require("../queries/impl/get-type-of-sample-by-id.query");
let TypeOfSampleResolver = class TypeOfSampleResolver {
    constructor(tosRepository, queryBus) {
        this.tosRepository = tosRepository;
        this.queryBus = queryBus;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getTypeOfSample(id) {
        this.logger.verbose('get-type-of-sample.query');
        try {
            return await this.tosRepository.getTypeOfSampleById(id);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async resolveReference(reference) {
        this.logger.verbose('resolve reference of type-sample');
        return await this.queryBus.execute(new get_type_of_sample_by_id_query_1.GetTypeOfSampleByIdQuery(reference.id));
    }
};
__decorate([
    graphql_1.Query(returns => type_of_sample_model_1.TypeOfSample),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TypeOfSampleResolver.prototype, "getTypeOfSample", null);
__decorate([
    graphql_1.ResolveReference(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TypeOfSampleResolver.prototype, "resolveReference", null);
TypeOfSampleResolver = __decorate([
    graphql_1.Resolver(of => type_of_sample_model_1.TypeOfSample),
    __metadata("design:paramtypes", [type_of_sample_repository_1.TypeOfSampleRepository,
        cqrs_1.QueryBus])
], TypeOfSampleResolver);
exports.TypeOfSampleResolver = TypeOfSampleResolver;
//# sourceMappingURL=type-of-sample.resolver.js.map