"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuizAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_quiz_answer_dto_1 = require("./create-quiz-answer.dto");
class UpdateQuizAnswerDto extends (0, swagger_1.PartialType)(create_quiz_answer_dto_1.CreateQuizAnswerDto) {
}
exports.UpdateQuizAnswerDto = UpdateQuizAnswerDto;
//# sourceMappingURL=update-quiz-answer.dto.js.map