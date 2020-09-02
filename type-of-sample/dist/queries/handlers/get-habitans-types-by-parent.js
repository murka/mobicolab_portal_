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
exports.GetAllHabitansHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const get_habitans_types_by_parent_query_1 = require("../impl/get-habitans-types-by-parent.query");
const habitan_repository_1 = require("../../modules/type-of-sample/repositories/habitan.repository");
const common_1 = require("@nestjs/common");
const habitans_type_model_1 = require("../../modules/type-of-sample/models/habitans-type.model");
let GetAllHabitansHandler = class GetAllHabitansHandler {
    constructor(habitanRepository) {
        this.habitanRepository = habitanRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async execute(query) {
        this.logger.verbose('get-all-habitans.query-handler');
        const { id } = query;
        try {
            return await this.habitanRepository.getHabitansTypesByParent(id);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
GetAllHabitansHandler = __decorate([
    cqrs_1.QueryHandler(get_habitans_types_by_parent_query_1.GetHabitansTypesByParentQuery),
    __metadata("design:paramtypes", [habitan_repository_1.HabitanRepository])
], GetAllHabitansHandler);
exports.GetAllHabitansHandler = GetAllHabitansHandler;
//# sourceMappingURL=get-habitans-types-by-parent.js.map