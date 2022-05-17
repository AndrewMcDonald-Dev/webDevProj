<script lang="ts">
	import type { Session } from '../models/session';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const session: Writable<Session> = getContext('session');
	const handleRegister = async () => {
		if (user.password === user.confirmPswd) {
			$session.Register(
				user.firstName,
				user.lastName,
				user.password,
				user.dob,
				user.email,
				user.pfp
			);
		}
	};

	let user = {
		firstName: '',
		lastName: '',
		password: '',
		email: '',
		dob: '',
		confirmPswd: '',
		pfp: ''
	};
</script>

<body>
	<div id="nav-placeholder" />
	<div class="wrap">
		<form class="register-form form" on:submit|preventDefault={handleRegister}>
			<div class="form-header">
				<h3>Register</h3>
			</div>
			<div class="form-group">
				<input
					type="text"
					class="form-input"
					placeholder="First Name"
					required
					bind:value={user.firstName}
				/>
				<input
					type="text"
					class="form-input ml"
					placeholder="Last Name"
					required
					bind:value={user.lastName}
				/>
			</div>
			<div class="form-group">
				<input
					type="email"
					class="form-input"
					placeholder="Email"
					required
					bind:value={user.email}
				/>
			</div>
			<div class="form-group">
				<span class="form-label">Profile Picture</span>
				<span class="form-label">Date of Birth</span>
			</div>
			<div class="form-group">
				<input type="text" class="form-input" placeholder="Image" required bind:value={user.pfp} />
				<input type="date" class="form-input ml" required bind:value={user.dob} />
			</div>
			<div class="form-group">
				<input
					type="password"
					class="form-input"
					placeholder="New Password"
					required
					bind:value={user.password}
				/>
				<input
					type="password"
					class="form-input ml"
					placeholder="Confirm Password"
					required
					bind:value={user.confirmPswd}
				/>
			</div>
			<div class="form-group">
				<button class="form-button" type="submit">Register</button>
			</div>
			<div class="form-footer">
				Have an account? <a href="/login">Sign In</a>
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

	.ml {
		margin-left: 2em;
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

	.form-label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.register-form {
		width: 32em;
	}
</style>
