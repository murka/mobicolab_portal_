"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const create_habitan_handler_1 = require("./create-habitan.handler");
const update_habitan_handler_1 = require("./update-habitan.handler");
const create_habitans_type_handler_1 = require("./create-habitans-type.handler");
const update_habitans_type_handler_1 = require("./update-habitans-type.handler");
exports.CommandHandlers = [
    create_habitan_handler_1.CreateHabitanHandler,
    update_habitan_handler_1.UpdateHabitanHandler,
    create_habitans_type_handler_1.CreateHabitansTypeHandler,
    update_habitans_type_handler_1.UpdateHabitansTypeHandler,
];
//# sourceMappingURL=index.js.map