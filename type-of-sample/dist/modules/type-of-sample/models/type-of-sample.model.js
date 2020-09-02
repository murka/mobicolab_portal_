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
exports.TypeOfSample = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const habitans_type_model_1 = require("./habitans-type.model");
const habitan_model_1 = require("./habitan.model");
const act_model_1 = require("./act.model");
let TypeOfSample = class TypeOfSample {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], TypeOfSample.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => habitan_model_1.Habitan),
    typeorm_1.ManyToOne(type => habitan_model_1.Habitan, habitan => habitan.label, { cascade: true, eager: true, onUpdate: 'CASCADE' }),
    __metadata("design:type", habitan_model_1.Habitan)
], TypeOfSample.prototype, "habitan", void 0);
__decorate([
    graphql_1.Field(type => habitans_type_model_1.HabitansType),
    typeorm_1.ManyToOne(type => habitans_type_model_1.HabitansType, htype => htype.label, { cascade: true, eager: true, onUpdate: 'CASCADE' }),
    __metadata("design:type", habitans_type_model_1.HabitansType)
], TypeOfSample.prototype, "htype", void 0);
__decorate([
    typeorm_1.OneToMany(type => act_model_1.Act, acts => acts.type_of_sample),
    __metadata("design:type", Array)
], TypeOfSample.prototype, "acts", void 0);
TypeOfSample = __decorate([
    typeorm_1.Entity(),
    graphql_1.ObjectType(),
    graphql_1.Directive('@key(fields: "id")')
], TypeOfSample);
exports.TypeOfSample = TypeOfSample;
//# sourceMappingURL=type-of-sample.model.js.map