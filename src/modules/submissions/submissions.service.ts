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

  /**
   * Mengumpulkan jawaban tugas.
   * Cek duplikasi: Satu siswa hanya boleh mengumpulkan satu kali per tugas.
   */
  async create(createSubmissionDto: CreateSubmissionDto, user: any): Promise<Submission> {
    const { assignmentId } = createSubmissionDto;
    const userId = user.id;

    const existing = await this.submissionRepository.findOne({
      where: { assignmentId, userId },
    });

    if (existing) {
      throw new ConflictException('You have already submitted for this assignment');
    }

    const submission = this.submissionRepository.create({
      ...createSubmissionDto,
      userId,
      status: createSubmissionDto.status || SubmissionStatus.SUBMITTED,
      submittedAt: new Date(),
    });

    return await this.submissionRepository.save(submission);
  }

  /**
   * Mengambil semua pengumpulan tugas.
   */
  async findAll() {
    const submissions = await this.submissionRepository.find({
      relations: ['user', 'assignment', 'assignment.course'],
    });
    return {
      message: 'All submissions retrieved successfully',
      data: submissions
    };
  }

  /**
   * Mengambil daftar pengumpulan untuk satu tugas tertentu.
   */
  async findByAssignment(assignmentId: string) {
    const submissions = await this.submissionRepository.find({
      where: { assignmentId },
      relations: ['user'],
    });
    return {
      message: 'Submissions for the assignment retrieved successfully',
      data: submissions
    };
  }

  /**
   * Mengambil riwayat pengumpulan milik user tertentu.
   */
  async findByUser(userId: string) {
    const submissions = await this.submissionRepository.find({
      where: { userId },
      relations: ['assignment', 'assignment.course'],
    });
    return {
      message: 'User submissions retrieved successfully',
      data: submissions
    };
  }

  /**
   * Mencari detail satu pengumpulan.
   */
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

  /**
   * Memperbarui pengumpulan (misal: memberikan nilai atau feedback).
   */
  async update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission> {
    const submission = await this.findOne(id);

    // Update waktu submit jika status berubah menjadi SUBMITTED
    if (updateSubmissionDto.status === SubmissionStatus.SUBMITTED && submission.status === SubmissionStatus.PENDING) {
      submission.submittedAt = new Date();
    }

    const updatedSubmission = this.submissionRepository.merge(submission, updateSubmissionDto);
    return await this.submissionRepository.save(updatedSubmission);
  }

  /**
   * Menghapus pengumpulan tugas.
   */
  async remove(id: string): Promise<void> {
    const submission = await this.findOne(id);
    await this.submissionRepository.remove(submission);
  }
}
