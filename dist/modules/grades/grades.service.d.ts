import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradesService {
    private readonly gradeRepository;
    constructor(gradeRepository: Repository<Grade>);
    create(createGradeDto: CreateGradeDto): Promise<Grade>;
    findAll(): Promise<Grade[]>;
    findByUser(userId: string): Promise<Grade[]>;
    findOne(id: string): Promise<Grade>;
    update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade>;
    remove(id: string): Promise<void>;
}
