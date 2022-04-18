$(document).ready(() => {
    $('button').click((event) => {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const user = login(email, password);
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
