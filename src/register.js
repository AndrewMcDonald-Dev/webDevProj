$(document).ready(() => {
    $('button').click((event) => {
        event.preventDefault();
        const firstName = $('input[placeholder="First Name"]').val();
        const lastName = $('input[placeholder="Last Name"]').val();
        const email = $('input[placeholder="Email"]').val();
        const password = $('input[placeholder="New Password"]').val();

        const user = register(firstName, lastName, email, password);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/shop.html';
        } else
            throw {
                name: 'LoginError',
                message: 'Invalid email or password',
            };
    });
});
