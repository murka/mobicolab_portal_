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
exports.CreateHabitanHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const create_habitan_command_1 = require("../impl/create-habitan.command");
const common_1 = require("@nestjs/common");
const habitan_model_1 = require("../../modules/type-of-sample/models/habitan.model");
const habitan_repository_1 = require("../../modules/type-of-sample/repositories/habitan.repository");
let CreateHabitanHandler = class CreateHabitanHandler {
    constructor(habitanRepository) {
        this.habitanRepository = habitanRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async execute(command) {
        this.logger.verbose('create-habitan.command-handler');
        const { label } = command;
        try {
            return await this.habitanRepository.newHabitan(label);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
CreateHabitanHandler = __decorate([
    cqrs_1.CommandHandler(create_habitan_command_1.CreateHabitanCommand),
    __metadata("design:paramtypes", [habitan_repository_1.HabitanRepository])
], CreateHabitanHandler);
exports.CreateHabitanHandler = CreateHabitanHandler;
//# sourceMappingURL=create-habitan.handler.js.map