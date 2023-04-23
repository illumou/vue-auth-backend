import {Router} from 'express';
import axios from 'axios';
import url from 'url';
import {checkAuthentication} from '../../utils/middleware';
import {checkUsers} from './users';
const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/:provider/login', async (req, res) => {
    switch (req.params.provider) {
        case 'discord': {
            // @ts-ignore
            req.session.auth = false;
            res.redirect(`${process.env.discord_login}`);
            break;
        }
        case 'local': {
            res.send('local');
            break;
        }
        default: {
            res.sendStatus(403);
        }
    }
});

router.get('/logout', (req, res) => {
    // @ts-ignore
    if (req.session.auth !== undefined) {
        req.session.destroy(function () {
            res.clearCookie('illumou.de');
            res.redirect('http://localhost:3000');
        });
    } else {
        res.redirect('http://localhost:3000');
    }
});

router.get('/redirect', checkAuthentication, async (req, res) => {
    const {code} = req.query;
    if (code) {
        try {
            const formData = new url.URLSearchParams({
                client_id: `${process.env.discord_client_id}`,
                client_secret: `${process.env.discord_client_secret}`,
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: `${process.env.discord_redirect}`
            });
            const response = await axios.post(
                'https://discord.com/api/v8/oauth2/token',
                formData.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            );
            const {access_token} = response.data;
            const {data: userResponse} = await axios.get(
                'https://discord.com/api/v8/users/@me',
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            );

            const user = checkUsers('discord', userResponse);

            if (user) {
                // @ts-ignore
                req.session.auth = true;
                res.redirect('http://localhost:3000/protected');
            } else {
                req.session.destroy(function () {
                    res.clearCookie('illumou.de');
                    res.redirect('http://localhost:3000');
                });
            }
        } catch (e) {
            res.sendStatus(400);
        }

    } else {
        res.redirect('http://localhost:3000');
    }
});

export default router;
