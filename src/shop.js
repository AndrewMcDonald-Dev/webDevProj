if (localStorage.getItem('user') == null) {
    window.location.href = './login.html';
}
$(document).ready(function () {
    $('#cart-button').click(function () {
        $('#cart-button').toggleClass('active');
        moveToCart();
    });
});

const moveToCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = './cart.html';
};

$('#logout').click(() => {
    localStorage.removeItem('user');
    window.location.href = './login.html';
});

$(document).ready(() => {
    itemList.forEach((item) => {
        $('.wrap-items').append(`
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${item.pic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <button class="btn btn-primary card-cart" id="item-${item.id}">Add to Cart</button>
                    </div>
                    </div>
                    `);
        $(`#item-${item.id}`).click(() => {
            $(this).toggleClass('active');
            addItemToCart(item.id);
        });
    });
});
