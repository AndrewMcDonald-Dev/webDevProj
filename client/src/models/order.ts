export interface Order {
	order_id: number;
	item_id: number;
	user_id: number;
	quantity: number;
	created_at: Date;
	delivery_date: Date;
	price: number;
}
