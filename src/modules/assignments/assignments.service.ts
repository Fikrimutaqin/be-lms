import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    return await this.assignmentRepository.find({
      relations: ['course'],
    });
  }

  async findByCourse(courseId: string): Promise<Assignment[]> {
    return await this.assignmentRepository.find({
      where: { courseId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID "${id}" not found`);
    }

    return assignment;
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment> {
    const assignment = await this.findOne(id);
    const updatedAssignment = this.assignmentRepository.merge(assignment, updateAssignmentDto);
    return await this.assignmentRepository.save(updatedAssignment);
  }

  async remove(id: string): Promise<void> {
    const assignment = await this.findOne(id);
    await this.assignmentRepository.remove(assignment);
  }
}
