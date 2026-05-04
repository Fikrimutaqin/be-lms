export declare enum UserRole {
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
