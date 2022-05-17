<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import '../app.scss';
	import { goto } from '$app/navigation';
	import { writable, type Writable } from 'svelte/store';
	import { api } from '../models/myFetch';
	import type { User } from '../models/user';
	import type { Session } from '../models/session';
	import Nav from '../components/Nav.svelte';
	import type { Item } from '../models/item';
	import type { Cart } from '../models/cart';

	export const session: Writable<Session> = writable({
		user: null as User | null,
		async api(
			path: string,
			body?: any,
			method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
			headers: any = {}
		) {
			if (this.user?.token) headers.Authorization = `Bearer ${this.user.token}`;

			try {
				const response = await api(path, body, method, headers);

				if (response.errors?.length)
					throw {
						message: response.errors.join('\n')
					};

				if (response.error) throw { message: response.error };

				return await response.data;
			} catch (error: any) {
				console.error(error);
			}
		},
		async Login(email: string, password: string) {
			try {
				const user = await this.api('users/login', { email, password }, 'POST');
				if (user) {
					this.user = user;
					localStorage.setItem('user', JSON.stringify(user));
					await goto('/shop');
				}
			} catch (err: any) {
				console.error(err);
			}
		},
		async LoginByToken(token: string) {
			try {
				const user = await this.api(`users/login${token}`);
				if (user) {
					this.user = user;
					localStorage.setItem('user', JSON.stringify(user));
					await goto('/shop');
				}
			} catch (err: any) {
				console.error(err);
			}
		},
		Logout() {
			this.user = null;
			localStorage.removeItem('user');
			goto('/login');
		},
		async Register(
			firstName: string,
			lastName: string,
			password: string,
			dob: string,
			email: string,
			pfp: string
		) {
			const user = {
				username: `${firstName} ${lastName}`,
				password,
				dob,
				email,
				pfp
			};

			try {
				const newUser = await this.api('users', user, 'POST');
				if (newUser) {
					this.user = newUser;
					localStorage.setItem('user', JSON.stringify(newUser));
					await goto('/shop');
				}
			} catch (err: any) {
				console.error(err);
			}
		}
	});

	export const cart: Cart = {
		items: [] as Item[],
		addItem(item: Item) {
			this.items.push(item);
		},
		removeItem(item_id: number) {
			this.items = this.items.filter((i) => i.item_id !== item_id);
		}
	};

	onMount(() => {
		const user = localStorage.getItem('user');
		if (user) {
			$session.user = JSON.parse(user);
		}
		//check what route we are on
		const path = window.location.pathname;
		if (path !== '/login' && path !== '/register') {
			if (!$session.user) goto('/login');
		} else if ($session.user) goto('/shop');
	});

	setContext('session', session);
	setContext('cart', cart);
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
/>
<Nav />
<slot />
