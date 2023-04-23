import {NextFunction, Request, Response} from 'express';

export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (req.session.auth !== undefined) {
        next();
    } else {
        res.send(false).status(200);
    }
}
