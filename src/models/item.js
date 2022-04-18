const itemList = [
    {
        name: 'Guitar',
        price: '550',
        id: 1,
        pic: '../../images/guitar.jpg',
        description: 'A brand new left handed guitar!',
    },
    {
        name: 'Guitar',
        price: '550',
        id: 2,
        pic: '../../images/guitar.jpg',
        description: 'A brand new left handed guitar!',
    },
    {
        name: 'Guitar',
        price: '550',
        id: 3,
        pic: '../../images/guitar.jpg',
        description: 'A brand new left handed guitar!',
    },
    {
        name: 'Guitar',
        price: '550',
        id: 4,
        pic: '../../images/guitar.jpg',
        description: 'A brand new left handed guitar!',
    },
    {
        name: 'Guitar',
        price: '550',
        id: 4,
        pic: '../../images/guitar.jpg',
        description: 'A brand new left handed guitar!',
    },
];

let highestIdItem = 5;

const cart = [
    {
        id: -1,
    },
];

// const user = localStorage.getItem('user');
// if (user) session.user = JSON.parse(user);

const createItem = (name, price, pic, description) => {
    // const item = itemList.find((item) => item.description === description);
    // if (item) {
    //     throw {
    //         statusCode: 409,
    //         message: 'Item already exists',
    //     };
    // }
    const newItem = {
        name,
        price,
        id: highestIdItem + 1,
        description,
        pic,
    };
    itemList.push(newItem);
    return newItem;
};

const getItem = (id) => {
    const item = itemList.find((item) => item.id === id);
    if (item) return item;
    throw { statusCode: 404, message: 'Item not found' };
};

const addItemToCart = (id) => {
    const item = itemList.find((item) => item.id === id);
    if (item) {
        cart.push(item);
        return item;
    }
    throw { statusCode: 404, message: 'Item not found' };
};

const clearCart = () => {
    cart.splice(0, cart.length);
    cart.push({
        id: -1,
    });
};
