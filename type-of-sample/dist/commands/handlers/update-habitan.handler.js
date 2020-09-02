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
exports.UpdateHabitanHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_habitan_command_1 = require("../impl/update-habitan.command");
const habitan_repository_1 = require("../../modules/type-of-sample/repositories/habitan.repository");
const habitan_model_1 = require("../../modules/type-of-sample/models/habitan.model");
const common_1 = require("@nestjs/common");
let UpdateHabitanHandler = class UpdateHabitanHandler {
    constructor(habitanRepository) {
        this.habitanRepository = habitanRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async execute(command) {
        this.logger.verbose('create-habitan.command-handler');
        const { id, label } = command;
        try {
            return await this.habitanRepository.updateHabitan(id, label);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
UpdateHabitanHandler = __decorate([
    cqrs_1.CommandHandler(update_habitan_command_1.UpdateHabitanCommand),
    __metadata("design:paramtypes", [habitan_repository_1.HabitanRepository])
], UpdateHabitanHandler);
exports.UpdateHabitanHandler = UpdateHabitanHandler;
//# sourceMappingURL=update-habitan.handler.js.map