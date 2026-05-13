import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { paginate } from '../../common/utils/pagination.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /**
   * Membuat user baru.
   * Melakukan hashing password sebelum disimpan.
   */
  async create(userData: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password!, salt);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  /**
   * Mengambil semua daftar user dengan pagination.
   */
  async findAll(query: PaginationQueryDto) {
    return paginate(
      this.usersRepository,
      {
        order: { createdAt: 'DESC' },
      },
      query,
      'Users retrieved successfully',
    );
  }

  /**
   * Mengambil semua user dengan role INSTRUCTOR.
   * Hanya mengembalikan field non-sensitif.
   */
  async findInstructors(query: PaginationQueryDto) {
    return paginate(
      this.usersRepository,
      {
        where: { role: UserRole.INSTRUCTOR },
        select: ['id', 'firstName', 'lastName', 'avatarUrl', 'title', 'bio', 'rating', 'reviewsCount', 'studentsCount', 'coursesCount'],
        order: { createdAt: 'DESC' },
      },
      query,
      'Instructors retrieved successfully',
    );
  }

  /**
   * Mencari user berdasarkan ID.
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  /**
   * Mencari user berdasarkan email.
   * Digunakan saat proses Login dan registrasi.
   */
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      // Paksa ambil password karena default-nya di-hide di Entity
      select: ['id', 'email', 'password', 'role', 'firstName', 'lastName'],
    });
  }

  /**
   * Menghapus user.
   */
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
