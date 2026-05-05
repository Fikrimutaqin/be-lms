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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("./entities/enrollment.entity");
const student_progress_entity_1 = require("./entities/student-progress.entity");
let EnrollmentsService = class EnrollmentsService {
    enrollmentRepository;
    progressRepository;
    constructor(enrollmentRepository, progressRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.progressRepository = progressRepository;
    }
    async create(createEnrollmentDto) {
        const { userId, courseId } = createEnrollmentDto;
        const existing = await this.enrollmentRepository.findOne({
            where: { userId, courseId },
        });
        if (existing) {
            throw new common_1.ConflictException('User is already enrolled in this course');
        }
        const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
        return await this.enrollmentRepository.save(enrollment);
    }
    async findAll() {
        return await this.enrollmentRepository.find({
            relations: ['user', 'course'],
        });
    }
    async findByUser(userId) {
        return await this.enrollmentRepository.find({
            where: { userId },
            relations: ['course'],
        });
    }
    async findOne(id) {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { id },
            relations: ['user', 'course'],
        });
        if (!enrollment) {
            throw new common_1.NotFoundException(`Enrollment with ID "${id}" not found`);
        }
        return enrollment;
    }
    async update(id, updateEnrollmentDto) {
        const enrollment = await this.findOne(id);
        if (updateEnrollmentDto.status === enrollment_entity_1.EnrollmentStatus.COMPLETED && enrollment.status !== enrollment_entity_1.EnrollmentStatus.COMPLETED) {
            updateEnrollmentDto.completedAt = new Date();
        }
        const updatedEnrollment = this.enrollmentRepository.merge(enrollment, updateEnrollmentDto);
        return await this.enrollmentRepository.save(updatedEnrollment);
    }
    async remove(id) {
        const enrollment = await this.findOne(id);
        await this.enrollmentRepository.remove(enrollment);
    }
    async getStudentProgress(userId) {
        return await this.progressRepository.find({
            where: { userId },
        });
    }
    async getCourseProgress(courseId) {
        return await this.progressRepository.find({
            where: { courseId },
        });
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(1, (0, typeorm_1.InjectRepository)(student_progress_entity_1.StudentProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map