import { StatusCodes } from 'http-status-codes';
import db from './mySQL';

export default class CompanyModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS company (
			company_id INT AUTO_INCREMENT,
			name VARCHAR(255) NOT NULL UNIQUE,
			description VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_company PRIMARY KEY (company_id)
			)`;
        await db.query(sql);
    }

    static async getCompany(id: number): Promise<Company> {
        const sql = `
		SELECT * FROM company
		WHERE company_id = ${id}
		`;
        const company = await db.query(sql);
        if (!company)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Company not found',
            };
        return company[0];
    }

    static async getAll(): Promise<Company[]> {
        const sql = `
		SELECT * FROM company
		`;
        const companies = await db.query(sql);
        if (!companies)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Companies not found',
            };
        return companies;
    }

    static async getCompanyByName(name: string): Promise<Company> {
        const sql = `
		SELECT * FROM company
		WHERE name = '${name}'
		`;
        const company = await db.query(sql);
        if (!company)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Company not found',
            };
        return company[0];
    }

    static async remove(id: number): Promise<void> {
        const findSql = `
		SELECT * FROM company
		WHERE company_id = ${id}
		`;
        const company = await db.query(findSql);
        if (!company)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Company not found',
            };

        const deleteSql = `
		DELETE FROM company
		WHERE company_id = ${id}
		`;
        await db.query(deleteSql);
        return company[0];
    }

    static async update(id: number, company: Company): Promise<Company> {
        const findSql = `
		SELECT * FROM company
		WHERE company_id = ${id}
		`;
        const companyFound = await db.query(findSql);
        if (!companyFound)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Company not found',
            };

        const updateSql = `
		UPDATE company
		SET name = '${company.name}', description = '${company.description}'
		WHERE company_id = ${id}
		`;
        await db.query(updateSql);
        return await this.getCompany(id);
    }

    static async create(company: Company): Promise<void> {
        const sql = `
		INSERT INTO company (name, description)
		VALUES ('${company.name}', '${company.description}')
		`;
        await db.query(sql);
    }

    static async seed(): Promise<Company[]> {
        list.forEach(async (company) => await this.create(company));
        return await Promise.all(
            list.map(
                async (company) => await this.getCompanyByName(company.name)
            )
        );
    }
}

CompanyModel.createTable();

interface Company {
    company_id?: number;
    name: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
}

const list = [
    {
        name: 'Google',
        description:
            'Google is a multinational corporation specializing in Internet-related services and products.',
    },
    {
        name: 'Apple',
        description:
            'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
    },
    {
        name: 'Microsoft',
        description:
            'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington.',
    },
];
