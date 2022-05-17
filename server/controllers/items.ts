import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ItemModel from '../models/item';

const app = express.Router();

app.get('/all', (req, res, next) => {
    ItemModel.getAll()
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
        ItemModel.getItem(parseInt(req.params.id))
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
        ItemModel.getItemByName(req.params.name)
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
        ItemModel.create(req.body).then((review) => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                errors: [],
                data: review,
            });
        });
    })
    .delete('/:id', (req, res, next) => {
        ItemModel.remove(parseInt(req.params.id))
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
        ItemModel.update(parseInt(req.params.id), req.body)
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
        ItemModel.seed()
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
