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
exports.HabitanResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const habitan_model_1 = require("../models/habitan.model");
const common_1 = require("@nestjs/common");
const habitans_type_model_1 = require("../models/habitans-type.model");
const cqrs_1 = require("@nestjs/cqrs");
const get_all_habitans_query_1 = require("../../../queries/impl/get-all-habitans.query");
const create_habitan_command_1 = require("../../../commands/impl/create-habitan.command");
const update_habitan_command_1 = require("../../../commands/impl/update-habitan.command");
const create_habitans_type_command_1 = require("../../../commands/impl/create-habitans-type.command");
const get_habitans_types_by_parent_query_1 = require("../../../queries/impl/get-habitans-types-by-parent.query");
const update_habitans_type_command_1 = require("../../../commands/impl/update-habitans-type.command");
let HabitanResolver = class HabitanResolver {
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getAllHabitans() {
        this.logger.verbose('get-all-habitan.query');
        try {
            return await this.queryBus.execute(new get_all_habitans_query_1.GetAllHabitansQuery());
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async createHabitan(label) {
        this.logger.verbose('create-habitan.method');
        try {
            return await this.commandBus.execute(new create_habitan_command_1.CreateHabitanCommand(label));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async updateHabitan(id, label) {
        this.logger.verbose('create-habitan.method');
        try {
            return await this.commandBus.execute(new update_habitan_command_1.UpdateHabitanCommand(id, label));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async htypes(habitan) {
        this.logger.verbose('resolve-fielde-htypes.method');
        const { id } = habitan;
        try {
            return await this.queryBus.execute(new get_habitans_types_by_parent_query_1.GetHabitansTypesByParentQuery(id));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async createHabitnsType(habitan, label) {
        this.logger.verbose('create-habitans-type.mutation');
        const { id } = habitan;
        try {
            return await this.commandBus.execute(new create_habitans_type_command_1.CreateHabitansTypeCommand(id, label));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async updateHabitansType(id, label) {
        this.logger.verbose('update-habitan-type.methos');
        try {
            return await this.commandBus.execute(new update_habitans_type_command_1.UpdateHabitansTypeCommand(id, label));
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
__decorate([
    graphql_1.Query(returns => habitan_model_1.Habitan),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "getAllHabitans", null);
__decorate([
    graphql_1.Mutation(of => habitan_model_1.Habitan),
    __param(0, graphql_1.Args('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "createHabitan", null);
__decorate([
    graphql_1.Mutation(of => habitan_model_1.Habitan),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "updateHabitan", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [habitan_model_1.Habitan]),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "htypes", null);
__decorate([
    graphql_1.Mutation(of => habitans_type_model_1.HabitansType),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [habitan_model_1.Habitan, String]),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "createHabitnsType", null);
__decorate([
    graphql_1.Mutation(of => habitans_type_model_1.HabitansType),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HabitanResolver.prototype, "updateHabitansType", null);
HabitanResolver = __decorate([
    graphql_1.Resolver(of => habitan_model_1.Habitan),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], HabitanResolver);
exports.HabitanResolver = HabitanResolver;
//# sourceMappingURL=habitan.resolver.js.map