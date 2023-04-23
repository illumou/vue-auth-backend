import {config} from 'dotenv';
config();

import express, {Express} from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from '../routes';
import {millisecondsfromminute} from "./calculator";

//import bcrypt from 'bcrypt';

export function createApp(): Express {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    app.options('/', cors());

    app.use(cors({origin: ['http://localhost:3000'], credentials: true, maxAge: 100000000, optionsSuccessStatus: 200}));
    app.use(
        session({
            name: 'illumou.de',
            secret: 'SESAM',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: millisecondsfromminute(20),
                secure: false,
            }
        })
    );

    app.use('/api', routes);

    return app;
}
