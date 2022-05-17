<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Session } from '../models/session';

	const session: Writable<Session> = getContext('session');
	const handleLogin = () => {
		$session.Login(user.email, user.password);
	};

	let user = {
		email: '',
		password: ''
	};
</script>

<body>
	<div id="nav-placeholder" />

	<div class="wrap">
		<form class="login-form form" on:submit|preventDefault={handleLogin}>
			<div class="form-header">
				<h3>Login</h3>
			</div>
			<div class="form-group">
				<input
					type="email"
					class="form-input"
					placeholder="Email"
					id="email"
					required
					bind:value={user.email}
				/>
			</div>
			<div class="form-group">
				<input
					type="password"
					class="form-input"
					placeholder="Password"
					id="password"
					required
					bind:value={user.password}
				/>
			</div>
			<div class="form-group">
				<a href="/password" class="form-forgot">Forgot Password?</a>
			</div>
			<div class="form-group">
				<button class="form-button" type="submit">Login</button>
			</div>
			<div class="form-footer">
				Don't have an account? <a href="/register">Sign Up</a>
			</div>
		</form>
	</div>
</body>

<style>
	body {
		height: 97%;
	}

	.wrap {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background: #fcfbfb; */
	}

	.form {
		margin: 0 auto;
		border: 1px solid #ddd;
		padding: 2rem;
		background: #eeeeee;
		box-shadow: 7px 7px 30px rgb(165, 164, 164);
		border-radius: 10px;

		-ms-transform: scale(0.65, 0.65);
		-webkit-transform: scale(0.65, 0.65);
		transform: scale(0.65, 0.65);
	}
	.form-input {
		background: #fafafa;
		border: 1px solid #e2e2e2;
		padding: 1em;
		width: 100%;
	}

	.form-group {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: row;
	}

	.form-button {
		background: #49bfd6;
		border: 1px solid #ddd;
		color: #ffffff;
		padding: 10px;
		width: 100%;
		text-transform: uppercase;
		border-radius: 3px;
	}

	.form-header h3 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
		font-size: 3rem;
	}

	.form-button:hover {
		background: #2ca8d1;
	}

	.form-footer {
		text-align: center;
	}

	.form-footer a {
		color: #3595b4;
	}

	.form-forgot {
		color: #3595b4 !important;
		padding: 0.3em 1em;
	}

	.login-form {
		width: 22em;
	}
</style>
