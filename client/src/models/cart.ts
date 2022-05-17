import type { Item } from './item';

export interface Cart {
	items: Item[];
	addItem(item: Item): void;
	removeItem(item_id: number): void;
}
