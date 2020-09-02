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
exports.Act = void 0;
const typeorm_1 = require("typeorm");
const type_of_sample_model_1 = require("./type-of-sample.model");
let Act = class Act {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Act.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => type_of_sample_model_1.TypeOfSample, type_of_sample => type_of_sample.acts, { cascade: true, onUpdate: 'CASCADE' }),
    __metadata("design:type", type_of_sample_model_1.TypeOfSample)
], Act.prototype, "type_of_sample", void 0);
Act = __decorate([
    typeorm_1.Entity()
], Act);
exports.Act = Act;
//# sourceMappingURL=act.model.js.map