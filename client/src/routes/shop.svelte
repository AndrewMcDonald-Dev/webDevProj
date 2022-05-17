<script lang="ts">
	import type { Item } from '../models/item';

	import { api } from '../models/myFetch';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Cart } from '../models/cart';

	const cart: Cart = getContext('cart');

	let items: Item[] = [];
	const getItem = async () => {
		items = (await api('items/all')).data;
	};
	getItem();

	const placeholder =
		'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?cs=srgb&dl=pexels-north-1407322.jpg&fm=jpg';

	const handleAdd = (item_id: number) => {
		const item = items.find((item) => item.item_id === item_id);
		if (item && !cart.items.includes(item)) cart.addItem(item);
		console.log(cart.items);
	};
</script>

<div class="wrap-items">
	{#each items as item}
		<div class="card" style="width: 18rem">
			<img src={placeholder} alt="Card cap" class="card-img-top" />
			<div class="card-body">
				<h5 class="card-title">{item.name}</h5>
				<p class="card-text">{item.description}</p>
				<button
					class="btn btn-primary card-cart"
					on:click|preventDefault={() => handleAdd(item.item_id)}>Add to Cart</button
				>
			</div>
		</div>
	{/each}
</div>

<style>
	.wrap-items {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-top: 1.5rem;
	}
</style>
