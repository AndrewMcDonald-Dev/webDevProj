import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import companiesController from './controllers/companies';
import itemsController from './controllers/items';
import ordersController from './controllers/orders';
import reviewsController from './controllers/reviews';
import usersController from './controllers/users';
import UserModel from './models/user';

const app = express();
const port = process.env.PORT || 3000;
app.use('/', express.static(`${__dirname}/public`))
    .use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use(express.json())
    .use((req: Request, res: Response, next: NextFunction) => {
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer ')) {
            const token = auth.split(' ')[1];
            UserModel.fromToken(token)
                .then((user) => {
                    //@ts-ignore
                    req.user = user;
                    next();
                })
                .catch(next);
        } else next();
    })
    .get('/api', (req: Request, res: Response) => {
        res.send('Hello world');
    })
    .use('/api/users', usersController)
    .use('/api/reviews', reviewsController)
    .use('/api/orders', ordersController)
    .use('/api/items', itemsController)
    .use('/api/companies', companiesController)
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        switch (err.code) {
            default:
                res.status(
                    err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
                ).send({ error: err.message ?? 'Internal server error' });
        }
    });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
