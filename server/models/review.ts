import { StatusCodes } from 'http-status-codes';
import db from './mySQL';

export default class ReviewModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS review (
			review_id INT AUTO_INCREMENT,
			item_id INT NOT NULL,
			user_id INT NOT NULL,
			content VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			CONSTRAINT PRIMARY KEY (review_id),
			CONSTRAINT review_item_id_fk FOREIGN KEY (item_id) REFERENCES item(item_id) ON DELETE CASCADE,
			CONSTRAINT review_user_id_fk FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
			)`;
        await db.query(sql);
    }

    static async getReview(id: number): Promise<Review> {
        const sql = `
		SELECT * FROM review
		WHERE review_id = ${id}
		`;
        const review = await db.query(sql);
        if (!review)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Review not found',
            };
        return review[0];
    }

    static async getReviews(item_id: number): Promise<Review[]> {
        const sql = `
		SELECT * FROM review
		WHERE item_id = ${item_id}
		`;
        const reviews = await db.query(sql);
        if (!reviews)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Review not found',
            };
        return reviews;
    }

    static async remove(id: number): Promise<void> {
        const findSql = `
		SELECT * FROM review
		WHERE review_id = ${id}
		`;
        const review = await db.query(findSql);
        if (!review)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Review not found',
            };

        const deleteSql = `
		DELETE FROM review
		WHERE review_id = ${id}
		`;
        await db.query(deleteSql);
        return review[0];
    }

    static async update(id: number, review: Review): Promise<Review> {
        const findSql = `
		SELECT * FROM review
		WHERE review_id = ${id}
		`;
        const reviewFound = await db.query(findSql);
        if (!reviewFound)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Review not found',
            };

        const updateSql = `
		UPDATE review
		SET item_id = ${review.item_id},
			user_id = ${review.user_id},
			content = '${review.content}',
		WHERE review_id = ${id}
		`;
        await db.query(updateSql);
        return await this.getReview(id);
    }

    static async create(review: Review): Promise<void> {
        const sql = `
		INSERT INTO review (item_id, user_id, content)
		VALUES (${review.item_id}, ${review.user_id}, '${review.content}')
		`;
        await db.query(sql);
    }

    static async seed(): Promise<void> {
        list.forEach(async (review: Review) => {
            await this.create(review);
        });
    }
}
ReviewModel.createTable();

interface Review {
    review_id?: number;
    item_id: number;
    user_id: number;
    content: string;
    created_at?: Date;
    updated_at?: Date;
}

const list = [
    {
        item_id: 3,
        user_id: 1,
        content: 'This is a good product',
    },
    {
        item_id: 4,
        user_id: 2,
        content: 'This is a bad product',
    },
];
