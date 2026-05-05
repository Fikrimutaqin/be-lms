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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
let QuizzesService = class QuizzesService {
    quizRepository;
    constructor(quizRepository) {
        this.quizRepository = quizRepository;
    }
    async create(createQuizDto) {
        const quiz = this.quizRepository.create(createQuizDto);
        return await this.quizRepository.save(quiz);
    }
    async findAll() {
        return await this.quizRepository.find({
            relations: ['course'],
        });
    }
    async findByCourse(courseId) {
        return await this.quizRepository.find({
            where: { courseId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID "${id}" not found`);
        }
        return quiz;
    }
    async update(id, updateQuizDto) {
        const quiz = await this.findOne(id);
        const updatedQuiz = this.quizRepository.merge(quiz, updateQuizDto);
        return await this.quizRepository.save(updatedQuiz);
    }
    async remove(id) {
        const quiz = await this.findOne(id);
        await this.quizRepository.remove(quiz);
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map