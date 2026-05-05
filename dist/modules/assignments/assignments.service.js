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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
let AssignmentsService = class AssignmentsService {
    assignmentRepository;
    constructor(assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }
    async create(createAssignmentDto) {
        const assignment = this.assignmentRepository.create(createAssignmentDto);
        return await this.assignmentRepository.save(assignment);
    }
    async findAll() {
        return await this.assignmentRepository.find({
            relations: ['course'],
        });
    }
    async findByCourse(courseId) {
        return await this.assignmentRepository.find({
            where: { courseId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const assignment = await this.assignmentRepository.findOne({
            where: { id },
            relations: ['course'],
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment with ID "${id}" not found`);
        }
        return assignment;
    }
    async update(id, updateAssignmentDto) {
        const assignment = await this.findOne(id);
        const updatedAssignment = this.assignmentRepository.merge(assignment, updateAssignmentDto);
        return await this.assignmentRepository.save(updatedAssignment);
    }
    async remove(id) {
        const assignment = await this.findOne(id);
        await this.assignmentRepository.remove(assignment);
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map