import type { User } from './user';

export interface Session {
	user: User | null;
	api(
		path: string,
		body?: any,
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined,
		headers?: any
	): Promise<any>;
	Login(email: string, password: string): Promise<void>;
	LoginByToken(token: string): Promise<void>;
	Logout(): void;
	Register(
		firstName: string,
		lastName: string,
		password: string,
		dob: string,
		email: string,
		pfp: string
	): Promise<void>;
}
