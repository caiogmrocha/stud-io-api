export type IPasswordRecoveryModel = {
	id: string;
	profile_id: string;
	code: string;
	send_code_token: string;
	change_password_token?: string;
	attempts: number;
	created_at?: Date;
	updated_at?: Date;
	expires_at?: Date;
	recovered_at?: Date;
}
