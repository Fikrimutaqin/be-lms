import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

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
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.usersRepository.findAndCount({
      take: limit,
      skip: skip,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Users retrieved successfully',
      data: items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: Number(limit),
        totalPages,
        currentPage: Number(page),
      },
    };
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
