"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAnswersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_answers_service_1 = require("./quiz-answers.service");
const quiz_answers_controller_1 = require("./quiz-answers.controller");
const quiz_answer_entity_1 = require("./entities/quiz-answer.entity");
let QuizAnswersModule = class QuizAnswersModule {
};
exports.QuizAnswersModule = QuizAnswersModule;
exports.QuizAnswersModule = QuizAnswersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quiz_answer_entity_1.QuizAnswer])],
        controllers: [quiz_answers_controller_1.QuizAnswersController],
        providers: [quiz_answers_service_1.QuizAnswersService],
        exports: [quiz_answers_service_1.QuizAnswersService],
    })
], QuizAnswersModule);
//# sourceMappingURL=quiz-answers.module.js.map