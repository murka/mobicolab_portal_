"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const get_all_habitans_handler_1 = require("./get-all-habitans.handler");
const get_habitans_types_by_parent_query_1 = require("../impl/get-habitans-types-by-parent.query");
exports.QueryHandlers = [
    get_all_habitans_handler_1.GetAllHabitansHandler,
    get_habitans_types_by_parent_query_1.GetHabitansTypesByParentQuery,
];
//# sourceMappingURL=index.js.map