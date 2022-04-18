if (localStorage.getItem('user') == null) window.location.href = './login.html';

if (!localStorage.getItem('cart').length) window.location.href = './shop.html';

const clearCartStorage = () => {
    localStorage.removeItem('cart');
    window.location.href = './shop.html';
};

$(document).ready(function () {
    $('#cart-button-1').click(function () {
        $('#cart-button-1').toggleClass('active');
        clearCartStorage();
    });
});

$(document).ready(() => {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems = cartItems.filter((item) => item.id !== -1);
    cartItems.forEach((item) => {
        $('.wrap-items').append(`
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${item.pic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">$${item.price}</p>
                    </div>
                    </div>
                    `);
        $(`#item-${item.id}`).click(() => {
            $(this).toggleClass('active');
            addItemToCart(item.id);
        });
    });
});
