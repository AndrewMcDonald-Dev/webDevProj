export interface User {
	user_id: number;
	email: string;
	username: string;
	pfp: string;
	dob: Date;
	created_at: Date;
	updated_at: Date;
	token?: string;
}
