export interface Review {
	review_id: number;
	item_id: number;
	user_id: number;
	content: string;
	created_at: Date;
	updated_at: Date;
}
