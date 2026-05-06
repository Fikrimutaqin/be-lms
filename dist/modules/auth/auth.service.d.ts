import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            avatarUrl: string;
            role: import("../users/entities/user.entity").UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        data: {
            access_token: string;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                role: import("../users/entities/user.entity").UserRole;
            };
        };
    }>;
}
