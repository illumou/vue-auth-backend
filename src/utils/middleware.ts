import {NextFunction, Request, Response} from 'express';

export function checkBody(req: Request, res: Response, next: NextFunction) {
    const key = req.query.key;
    if (key !== 'express-api') {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}
