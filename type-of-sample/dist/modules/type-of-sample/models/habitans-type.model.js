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
exports.HabitansType = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const habitan_model_1 = require("./habitan.model");
const type_of_sample_model_1 = require("./type-of-sample.model");
let HabitansType = class HabitansType {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], HabitansType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], HabitansType.prototype, "label", void 0);
__decorate([
    graphql_1.Field(type => habitan_model_1.Habitan),
    typeorm_1.ManyToOne(type => habitan_model_1.Habitan, habitan => habitan.htypes),
    __metadata("design:type", habitan_model_1.Habitan)
], HabitansType.prototype, "habitan", void 0);
__decorate([
    graphql_1.Field(type => type_of_sample_model_1.TypeOfSample),
    typeorm_1.OneToMany(type => type_of_sample_model_1.TypeOfSample, type_of_samples => type_of_samples.htype),
    __metadata("design:type", Array)
], HabitansType.prototype, "type_of_samples", void 0);
HabitansType = __decorate([
    typeorm_1.Entity(),
    graphql_1.ObjectType()
], HabitansType);
exports.HabitansType = HabitansType;
//# sourceMappingURL=habitans-type.model.js.map