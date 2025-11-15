"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBodyPartDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_body_part_dto_1 = require("./create-body-part.dto");
class UpdateBodyPartDto extends (0, swagger_1.PartialType)(create_body_part_dto_1.CreateBodyPartDto) {
}
exports.UpdateBodyPartDto = UpdateBodyPartDto;
//# sourceMappingURL=update-body-part.dto.js.map