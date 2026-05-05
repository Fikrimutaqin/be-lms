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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
const course_stats_entity_1 = require("./entities/course-stats.entity");
let CoursesService = class CoursesService {
    courseRepository;
    statsRepository;
    constructor(courseRepository, statsRepository) {
        this.courseRepository = courseRepository;
        this.statsRepository = statsRepository;
    }
    async create(createCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return await this.courseRepository.save(course);
    }
    async findAll() {
        return await this.courseRepository.find({
            relations: ['instructor'],
        });
    }
    async findOne(id) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['instructor'],
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID "${id}" not found`);
        }
        return course;
    }
    async update(id, updateCourseDto) {
        const course = await this.findOne(id);
        const updatedCourse = this.courseRepository.merge(course, updateCourseDto);
        return await this.courseRepository.save(updatedCourse);
    }
    async remove(id) {
        const course = await this.findOne(id);
        await this.courseRepository.remove(course);
    }
    async getStats() {
        return await this.statsRepository.find();
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(course_stats_entity_1.CourseStats)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map