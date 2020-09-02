"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOfSampleModule = void 0;
const common_1 = require("@nestjs/common");
const type_of_sample_resolver_1 = require("./resolvers/type-of-sample.resolver");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const type_of_sample_model_1 = require("./models/type-of-sample.model");
const habitan_model_1 = require("./models/habitan.model");
const habitans_type_model_1 = require("./models/habitans-type.model");
const type_of_sample_repository_1 = require("./repositories/type-of-sample.repository");
const habitan_repository_1 = require("./repositories/habitan.repository");
const habitans_type_repository_1 = require("./repositories/habitans-type.repository");
const habitan_resolver_1 = require("./resolvers/habitan.resolver");
const handlers_1 = require("../../commands/handlers");
const handlers_2 = require("../../queries/handlers");
const act_model_1 = require("./models/act.model");
let TypeOfSampleModule = class TypeOfSampleModule {
};
TypeOfSampleModule = __decorate([
    common_1.Module({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([
                type_of_sample_model_1.TypeOfSample,
                act_model_1.Act,
                habitan_model_1.Habitan,
                habitans_type_model_1.HabitansType,
                type_of_sample_repository_1.TypeOfSampleRepository,
                habitan_repository_1.HabitanRepository,
                habitans_type_repository_1.HabitansTypeRepository,
            ]),
        ],
        providers: [
            type_of_sample_resolver_1.TypeOfSampleResolver,
            habitan_resolver_1.HabitanResolver,
            type_of_sample_resolver_1.TypeOfSampleResolver,
            ...handlers_1.CommandHandlers,
            ...handlers_2.QueryHandlers,
        ],
    })
], TypeOfSampleModule);
exports.TypeOfSampleModule = TypeOfSampleModule;
//# sourceMappingURL=type-of-sample.module.js.map