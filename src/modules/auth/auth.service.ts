import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * Logika pendaftaran user.
   * Melakukan pengecekan email ganda sebelum menyimpan ke database.
   */
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersService.create(registerDto);

    // Hilangkan password dari hasil return agar tidak bocor ke client
    const { password, ...result } = user as User;
    return {
      message: 'User registered successfully',
      data: result
    };
  }

  /**
   * Logika Login.
   * Memvalidasi email dan password (menggunakan bcrypt untuk perbandingan hash).
   * Mengembalikan token JWT yang berisi info ID, Email, dan Role.
   */
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Bandingkan password yang dikirim dengan hash di DB
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      message: 'Login successful',
      data: {
        access_token: await this.jwtService.signAsync(payload),
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      }
    };
  }
}
