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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const submission_entity_1 = require("./entities/submission.entity");
let SubmissionsService = class SubmissionsService {
    submissionRepository;
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }
    async create(createSubmissionDto) {
        const { assignmentId, userId } = createSubmissionDto;
        const existing = await this.submissionRepository.findOne({
            where: { assignmentId, userId },
        });
        if (existing) {
            throw new common_1.ConflictException('User has already submitted for this assignment');
        }
        const submission = this.submissionRepository.create({
            ...createSubmissionDto,
            status: createSubmissionDto.status || submission_entity_1.SubmissionStatus.SUBMITTED,
            submittedAt: new Date(),
        });
        return await this.submissionRepository.save(submission);
    }
    async findAll() {
        return await this.submissionRepository.find({
            relations: ['user', 'assignment', 'assignment.course'],
        });
    }
    async findByAssignment(assignmentId) {
        return await this.submissionRepository.find({
            where: { assignmentId },
            relations: ['user'],
        });
    }
    async findByUser(userId) {
        return await this.submissionRepository.find({
            where: { userId },
            relations: ['assignment', 'assignment.course'],
        });
    }
    async findOne(id) {
        const submission = await this.submissionRepository.findOne({
            where: { id },
            relations: ['user', 'assignment', 'assignment.course'],
        });
        if (!submission) {
            throw new common_1.NotFoundException(`Submission with ID "${id}" not found`);
        }
        return submission;
    }
    async update(id, updateSubmissionDto) {
        const submission = await this.findOne(id);
        if (updateSubmissionDto.status === submission_entity_1.SubmissionStatus.SUBMITTED && submission.status === submission_entity_1.SubmissionStatus.PENDING) {
            submission.submittedAt = new Date();
        }
        const updatedSubmission = this.submissionRepository.merge(submission, updateSubmissionDto);
        return await this.submissionRepository.save(updatedSubmission);
    }
    async remove(id) {
        const submission = await this.findOne(id);
        await this.submissionRepository.remove(submission);
    }
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(submission_entity_1.Submission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map