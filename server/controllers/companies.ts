import express from 'express';
import { StatusCodes } from 'http-status-codes';
import CompanyModel from '../models/company';

const app = express.Router();

app.get('/', (req, res, next) => {
    CompanyModel.getAll()
        .then((reviews) => {
            res.status(StatusCodes.OK).json({
                success: true,
                errors: [],
                data: reviews,
            });
        })
        .catch(next);
})
    .get('/:id', (req, res, next) => {
        CompanyModel.getCompany(parseInt(req.params.id))
            .then((review) => {
                res.status(StatusCodes.OK).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    })
    .get('/one/:name', (req, res, next) => {
        CompanyModel.getCompanyByName(req.params.name)
            .then((review) => {
                res.status(StatusCodes.OK).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    })
    .post('/', (req, res, next) => {
        CompanyModel.create(req.body)
            .then((review) => {
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        CompanyModel.remove(parseInt(req.params.id))
            .then((review) => {
                res.status(StatusCodes.OK).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        CompanyModel.update(parseInt(req.params.id), req.body)
            .then((review) => {
                res.status(StatusCodes.OK).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    })
    .post('/seed', (req, res, next) => {
        CompanyModel.seed()
            .then((review) => {
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    errors: [],
                    data: review,
                });
            })
            .catch(next);
    });

export default app;
