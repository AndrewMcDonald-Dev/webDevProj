import { StatusCodes } from 'http-status-codes';
import db from './mySQL';

export default class ItemModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS item (
			item_id INT AUTO_INCREMENT,
			company_id INT NOT NULL,
			name VARCHAR(255) NOT NULL UNIQUE,
			description VARCHAR(255) NOT NULL,
			price INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_item PRIMARY KEY (item_id),
			CONSTRAINT fk_item_company FOREIGN KEY (company_id) REFERENCES company(company_id)
		)`;

        await db.query(sql);
    }

    static async getItem(id: number): Promise<Item> {
        const sql = `
		SELECT * FROM item
		WHERE item_id = ${id}
		`;
        const item = await db.query(sql);
        if (!item)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Item not found',
            };
        return item[0];
    }

    static async getItemByName(name: string): Promise<Item> {
        const sql = `
		SELECT * FROM item
		WHERE name = '${name}'
		`;
        const item = await db.query(sql);
        if (!item)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Item not found',
            };
        return item[0];
    }

    static async getAll(): Promise<Item[]> {
        const sql = `
		SELECT * FROM item
		`;
        const items = await db.query(sql);
        if (!items)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Items not found',
            };
        return items;
    }

    static async remove(id: number): Promise<void> {
        const findSql = `
		SELECT * FROM item
		WHERE item_id = ${id}
		`;
        const item = await db.query(findSql);
        if (!item)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Item not found',
            };

        const deleteSql = `
		DELETE FROM item
		WHERE item_id = ${id}
		`;
        await db.query(deleteSql);
        return item[0];
    }

    static async update(id: number, item: Item): Promise<Item> {
        const findSql = `
		SELECT * FROM item
		WHERE item_id = ${id}
		`;
        const itemFound = await db.query(findSql);
        if (!itemFound)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Item not found',
            };

        const updateSql = `
		UPDATE item
		SET name = '${item.name}',
			description = '${item.description}'
			price = ${item.price}
		WHERE item_id = ${id}
		`;
        await db.query(updateSql);
        return await this.getItem(id);
    }

    static async create(item: Item): Promise<void> {
        const sql = `
		INSERT INTO item (name, description, price, company_id)
		VALUES ('${item.name}', '${item.description}', ${item.price}, ${item.company_id})
		`;
        await db.query(sql);
    }

    static async seed(): Promise<Item[]> {
        list.forEach(async (item: Item) => {
            await this.create(item);
        });

        return await Promise.all(
            list.map(async (company) => await this.getItemByName(company.name))
        );
    }
}

ItemModel.createTable();

interface Item {
    item_id?: number;
    company_id: number;
    name: string;
    description: string;
    price: number;

    created_at?: Date;
    updated_at?: Date;
}

const list = [
    {
        company_id: 1,
        name: 'Guitar 1',
        description: 'Description 1',
        price: 1,
    },
    {
        company_id: 2,
        name: 'Guitar 2',
        description: 'Description 2',
        price: 2,
    },
    {
        company_id: 1,
        name: 'Guitar 3',
        description: 'Description 2',
        price: 2,
    },
    {
        company_id: 3,
        name: 'Guitar 4',
        description: 'Description 2',
        price: 2,
    },
    {
        company_id: 3,
        name: 'Guitar 5',
        description: 'Description 2',
        price: 2,
    },
    {
        company_id: 1,
        name: 'Guitar 6',
        description: 'Description 2',
        price: 2,
    },
];
