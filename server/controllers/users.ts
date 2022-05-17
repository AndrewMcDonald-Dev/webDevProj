import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user';

const app = express.Router();

app.get('/', (req, res, next) => {
    UserModel.getUsers()
        .then((users) => {
            res.status(StatusCodes.OK).send({
                success: true,
                errors: [],
                data: users,
            });
        })
        .catch(next);
})
    .get('/username/:username', (req, res, next) => {
        UserModel.getUserByUsername(req.params.username)
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .get(':id', (req, res, next) => {
        UserModel.getUser(parseInt(req.params.id))
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        UserModel.remove(parseInt(req.params.id))
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .post('/', (req, res, next) => {
        UserModel.create(req.body)
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        UserModel.update(parseInt(req.params.id), req.body)
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .post('/login', (req, res, next) => {
        UserModel.login(req.body.email, req.body.password)
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .get('/login/:token', (req, res, next) => {
        UserModel.getByToken(req.params.token)
            .then((user) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: user,
                });
            })
            .catch(next);
    })
    .post('/seed', (req, res, next) => {
        UserModel.seed()
            .then((users) => {
                res.status(StatusCodes.OK).send({
                    success: true,
                    errors: [],
                    data: users,
                });
            })
            .catch(next);
    });

export default app;
