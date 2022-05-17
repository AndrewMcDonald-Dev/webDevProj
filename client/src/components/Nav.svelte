<script lang="ts">
	import type { Session } from '../models/session';

	import { getContext, onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	const session: Writable<Session> = getContext('session');
	const handleLogout = () => {
		$session.Logout();
	};
</script>

<body>
	<nav class="navbar navbar-light bg-light justify-content-between">
		<div class="container-fluid">
			<a class="navbar-brand logo" href="/">
				<i class="fa-solid fa-bag-shopping" />
				Shoppy
			</a>
			{#if $session.user}
				<div class="navbar-text d-flex">
					<div class="profile-header-container">
						<div class="profile-header-img">
							<img class="img-circle" src={$session.user.pfp} alt="" />
						</div>
					</div>
					{#if window.location.pathname !== '/cart'}
						<button on:click|preventDefault={() => goto('./cart')} class="btn btn-primary pr"
							>Cart</button
						>
					{:else}
						<button class="btn btn-primary pr" on:click|preventDefault={() => console.log('Work')}
							>Order</button
						>
					{/if}
					<button on:click|preventDefault={handleLogout} class="btn btn-secondary">Logout</button>
				</div>
			{:else}
				<span class="navbar-text">
					<button on:click={() => goto('./login')} class="btn btn-primary pr">Login</button>
					<button on:click={() => goto('./register')} class="btn btn-secondary">Register</button>
				</span>
			{/if}
		</div>
	</nav>
</body>

<style>
	body {
		height: 100%;
		background-repeat: no-repeat;
	}
	.profile-header-container {
		margin: 0 auto;
		text-align: center;
	}

	.profile-header-img {
		padding-right: 1em;
	}

	.profile-header-img > img.img-circle {
		width: 2.2em;
		height: 2.2em;
		border: 2px solid #51d2b7;
		border-radius: 50%;
	}

	.pr {
		margin-right: 1em;
		width: 4.5em;
	}
</style>
