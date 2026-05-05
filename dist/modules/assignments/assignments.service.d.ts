import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsService {
    private readonly assignmentRepository;
    constructor(assignmentRepository: Repository<Assignment>);
    create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment>;
    findAll(): Promise<Assignment[]>;
    findByCourse(courseId: string): Promise<Assignment[]>;
    findOne(id: string): Promise<Assignment>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<Assignment>;
    remove(id: string): Promise<void>;
}
