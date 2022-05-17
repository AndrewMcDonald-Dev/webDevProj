import express from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderModel from '../models/order';

const app = express.Router();

app.get('/all/:id', (req, res, next) => {
    OrderModel.getOrders(parseInt(req.params.id))
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
        OrderModel.getOrder(parseInt(req.params.id))
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
        OrderModel.create(req.body)
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
        OrderModel.remove(parseInt(req.params.id))
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
        OrderModel.update(parseInt(req.params.id), req.body)
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
        OrderModel.seed()
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
