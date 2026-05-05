"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_questions_service_1 = require("./quiz-questions.service");
const quiz_questions_controller_1 = require("./quiz-questions.controller");
const quiz_question_entity_1 = require("./entities/quiz-question.entity");
let QuizQuestionsModule = class QuizQuestionsModule {
};
exports.QuizQuestionsModule = QuizQuestionsModule;
exports.QuizQuestionsModule = QuizQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quiz_question_entity_1.QuizQuestion])],
        controllers: [quiz_questions_controller_1.QuizQuestionsController],
        providers: [quiz_questions_service_1.QuizQuestionsService],
        exports: [quiz_questions_service_1.QuizQuestionsService],
    })
], QuizQuestionsModule);
//# sourceMappingURL=quiz-questions.module.js.map