import { StatusCodes } from 'http-status-codes';
import db from './mySQL';

export default class OrderModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS orders (
			order_id INT AUTO_INCREMENT,
			item_id INT NOT NULL,
			user_id INT NOT NULL,
			quantity INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			order_date INT NOT NULL,
			delivery_date INT NOT NULL,
			price INT NOT NULL,
			CONSTRAINT PRIMARY KEY (order_id),
			CONSTRAINT FOREIGN KEY (item_id) REFERENCES item(item_id),
			CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
		)`;

        await db.query(sql);
    }

    static async getOrder(id: number): Promise<Order> {
        const sql = `
		SELECT * FROM orders
		WHERE order_id = ${id}
		`;
        const order = await db.query(sql);
        if (!order)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Order not found',
            };
        return order[0];
    }

    static async getOrders(user_id: number): Promise<Order[]> {
        const sql = `
		SELECT * FROM orders
		WHERE user_id = ${user_id}
		`;
        const orders = await db.query(sql);
        if (!orders)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Order not found',
            };
        return orders;
    }

    static async remove(id: number): Promise<void> {
        const findSql = `
		SELECT * FROM orders
		WHERE order_id = ${id}
		`;
        const order = await db.query(findSql);
        if (!order)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Order not found',
            };

        const removeSql = `
		DELETE FROM orders
		WHERE order_id = ${id}
		`;
        await db.query(removeSql);
        return order[0];
    }

    static async update(id: number, order: Order): Promise<Order> {
        const findSql = `
		SELECT * FROM orders
		WHERE order_id = ${id}
		`;
        const orderFound = await db.query(findSql);
        if (!orderFound)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Order not found',
            };

        const updateSql = `
		UPDATE orders
		SET item_id = ${order.item_id},
		user_id = ${order.user_id},
		quantity = ${order.quantity},
		delivery_date = ${(order.delivery_date.getTime() / 1000).toFixed(0)},
		price = ${order.price}
		WHERE order_id = ${id}
		`;
        await db.query(updateSql);
        return await this.getOrder(id);
    }

    static async create(order: Order): Promise<void> {
        const sql = `
		INSERT INTO orders (item_id, user_id, quantity, delivery_date, order_date, price)
		VALUES (${order.item_id}, ${order.user_id}, ${order.quantity}, ${(
            order.delivery_date.getTime() / 1000
        ).toFixed(0)}, ${(new Date().getTime() / 1000).toFixed(0)}, ${
            order.price
        })
		`;
        await db.query(sql);
    }

    static async seed(): Promise<void> {
        list.forEach(async (order: Order) => {
            await this.create(order);
        });
    }
}
OrderModel.createTable();

interface Order {
    order_id?: number;
    item_id: number;
    user_id: number;
    quantity: number;
    created_at?: Date;
    delivery_date: Date;
    price: number;
}

const list = [
    {
        item_id: 4,
        user_id: 1,
        quantity: 1,
        delivery_date: new Date(2020, 1, 1),
        price: 100,
    },
    {
        item_id: 4,
        user_id: 1,
        quantity: 2,
        delivery_date: new Date(2020, 1, 2),
        price: 200,
    },
];
