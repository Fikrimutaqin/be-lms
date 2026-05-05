import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission, SubmissionStatus } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const { assignmentId, userId } = createSubmissionDto;

    const existing = await this.submissionRepository.findOne({
      where: { assignmentId, userId },
    });

    if (existing) {
      throw new ConflictException('User has already submitted for this assignment');
    }

    const submission = this.submissionRepository.create({
      ...createSubmissionDto,
      status: createSubmissionDto.status || SubmissionStatus.SUBMITTED,
      submittedAt: new Date(),
    });

    return await this.submissionRepository.save(submission);
  }

  async findAll(): Promise<Submission[]> {
    return await this.submissionRepository.find({
      relations: ['user', 'assignment', 'assignment.course'],
    });
  }

  async findByAssignment(assignmentId: string): Promise<Submission[]> {
    return await this.submissionRepository.find({
      where: { assignmentId },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<Submission[]> {
    return await this.submissionRepository.find({
      where: { userId },
      relations: ['assignment', 'assignment.course'],
    });
  }

  async findOne(id: string): Promise<Submission> {
    const submission = await this.submissionRepository.findOne({
      where: { id },
      relations: ['user', 'assignment', 'assignment.course'],
    });

    if (!submission) {
      throw new NotFoundException(`Submission with ID "${id}" not found`);
    }

    return submission;
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission> {
    const submission = await this.findOne(id);

    if (updateSubmissionDto.status === SubmissionStatus.SUBMITTED && submission.status === SubmissionStatus.PENDING) {
      submission.submittedAt = new Date();
    }

    const updatedSubmission = this.submissionRepository.merge(submission, updateSubmissionDto);
    return await this.submissionRepository.save(updatedSubmission);
  }

  async remove(id: string): Promise<void> {
    const submission = await this.findOne(id);
    await this.submissionRepository.remove(submission);
  }
}
