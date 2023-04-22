import { config } from 'dotenv';
import {createApp} from './utils/createApp';

config();
const port = process.env.PORT || 3001;

async function main() {
    try {
        const app = createApp();
        app.listen(port, () => console.log(`Running on Port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

main();
