import { User } from "..";

export interface DatabaseUser extends User {
	id: string;
	name: string;
	email: string;
	hashedPassword: string;
	// emailVerified: Date | null;
}

export interface CreateUserDTO {
	name: string;
	email: string;
	hashedPassword: string;
}

export interface UpdateUserDTO {
	name?: string;
	email?: string;
	hashedPassword?: string;
	roles?: string[];
	metadata?: Record<string, any>;
}

export interface UserRepository {
	findByEmail: (email: string) => Promise<DatabaseUser | null>;
// 	findById: (id: string) => Promise<DatabaseUser | null>;
// 	create: (user: CreateUserDTO) => Promise<DatabaseUser>;
// 	update: (id: string, data: UpdateUserDTO) => Promise<DatabaseUser>;
}
