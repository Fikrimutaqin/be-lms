"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuizQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_quiz_question_dto_1 = require("./create-quiz-question.dto");
class UpdateQuizQuestionDto extends (0, swagger_1.PartialType)(create_quiz_question_dto_1.CreateQuizQuestionDto) {
}
exports.UpdateQuizQuestionDto = UpdateQuizQuestionDto;
//# sourceMappingURL=update-quiz-question.dto.js.map