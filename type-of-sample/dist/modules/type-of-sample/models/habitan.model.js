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
exports.Habitan = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const habitans_type_model_1 = require("./habitans-type.model");
const type_of_sample_model_1 = require("./type-of-sample.model");
let Habitan = class Habitan {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Habitan.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Habitan.prototype, "label", void 0);
__decorate([
    graphql_1.Field(type => [habitans_type_model_1.HabitansType]),
    typeorm_1.OneToMany(type => habitans_type_model_1.HabitansType, htypes => htypes.habitan, {
        cascade: true,
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", Array)
], Habitan.prototype, "htypes", void 0);
__decorate([
    graphql_1.Field(type => [type_of_sample_model_1.TypeOfSample]),
    typeorm_1.OneToMany(type => type_of_sample_model_1.TypeOfSample, type_of_samples => type_of_samples.habitan),
    __metadata("design:type", Array)
], Habitan.prototype, "type_of_samples", void 0);
Habitan = __decorate([
    typeorm_1.Entity(),
    graphql_1.ObjectType()
], Habitan);
exports.Habitan = Habitan;
//# sourceMappingURL=habitan.model.js.map