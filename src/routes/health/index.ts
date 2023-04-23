import {Router} from 'express';
import { checkAuthentication } from '../../utils/middleware';

const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/check', checkAuthentication, (req, res) => {
    // @ts-ignore
    if(req.session.auth) {
        req.session.touch();
        res.send(true).status(200);
    } else {
        res.send(false).status(400);
    }
});

export default router;
