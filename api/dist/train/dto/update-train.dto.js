"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrainDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_train_dto_1 = require("./create-train.dto");
class UpdateTrainDto extends (0, swagger_1.PartialType)(create_train_dto_1.CreateTrainDto) {
}
exports.UpdateTrainDto = UpdateTrainDto;
//# sourceMappingURL=update-train.dto.js.map