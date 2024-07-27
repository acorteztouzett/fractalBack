import express, { Application } from 'express';
import orderRoutes from '../routes/order';
import productRoutes from '../routes/product';
import cors from 'cors';

import db from '../db/connection';
import { envs } from './envs';


class Server {

    private app: Application;
    private port: number;
    private apiPaths = {
        usuarios: '/api/usuarios',
        orders: '/api/orders',
        products: '/api/products',
    }

    constructor() {
        this.app  = express();
        this.port = envs.serverPort;

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares() {


        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.orders, orderRoutes )
        this.app.use( this.apiPaths.products, productRoutes)
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port: ' + this.port );
        })
    }

}

export default Server;