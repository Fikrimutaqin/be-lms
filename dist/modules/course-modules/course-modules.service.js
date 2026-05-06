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
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_module_entity_1 = require("./entities/course-module.entity");
let CourseModulesService = class CourseModulesService {
    moduleRepository;
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    async create(createCourseModuleDto) {
        const module = this.moduleRepository.create(createCourseModuleDto);
        return await this.moduleRepository.save(module);
    }
    async findAll() {
        const modules = await this.moduleRepository.find({
            order: { sequenceOrder: 'ASC' },
        });
        return {
            message: 'All modules retrieved successfully',
            data: modules
        };
    }
    async findByCourse(courseId) {
        const modules = await this.moduleRepository.find({
            where: { courseId },
            order: { sequenceOrder: 'ASC' },
        });
        return {
            message: 'Modules for the course retrieved successfully',
            data: modules
        };
    }
    async findOne(id) {
        const module = await this.moduleRepository.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!module) {
            throw new common_1.NotFoundException(`Module with ID "${id}" not found`);
        }
        return module;
    }
    async update(id, updateCourseModuleDto) {
        const module = await this.findOne(id);
        const updatedModule = this.moduleRepository.merge(module, updateCourseModuleDto);
        return await this.moduleRepository.save(updatedModule);
    }
    async remove(id) {
        const module = await this.findOne(id);
        await this.moduleRepository.remove(module);
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_module_entity_1.CourseModule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map