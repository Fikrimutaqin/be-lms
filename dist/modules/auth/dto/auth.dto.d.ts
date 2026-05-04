import { UserRole } from "../../users/entities/user.entity";
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    role: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
