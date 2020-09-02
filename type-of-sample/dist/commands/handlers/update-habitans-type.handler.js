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
exports.UpdateHabitansTypeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_habitans_type_command_1 = require("../impl/update-habitans-type.command");
const common_1 = require("@nestjs/common");
const habitans_type_model_1 = require("../../modules/type-of-sample/models/habitans-type.model");
const habitans_type_repository_1 = require("../../modules/type-of-sample/repositories/habitans-type.repository");
let UpdateHabitansTypeHandler = class UpdateHabitansTypeHandler {
    constructor(htRepository) {
        this.htRepository = htRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async execute(command) {
        this.logger.verbose('create-habitan.command-handler');
        const { id, label } = command;
        try {
            return await this.htRepository.updateHabitansType(id, label);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
UpdateHabitansTypeHandler = __decorate([
    cqrs_1.CommandHandler(update_habitans_type_command_1.UpdateHabitansTypeCommand),
    __metadata("design:paramtypes", [habitans_type_repository_1.HabitansTypeRepository])
], UpdateHabitansTypeHandler);
exports.UpdateHabitansTypeHandler = UpdateHabitansTypeHandler;
//# sourceMappingURL=update-habitans-type.handler.js.map