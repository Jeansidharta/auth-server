import express from 'express';
import CookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import './lib/permissions-database';

const PORT = process.env.PORT || 4001;
const THROTTLE_TIME = 1000; // 1 second

const app = express();

app.use(cors({ credentials: true, origin: 'https://auth-manager.sidharta.xyz' }));
app.use(CookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// Throttling logic
let canUseAuth = true;
app.use((req, res, next) => {
	if (req.method !== 'POST') return next();

	if (!canUseAuth) {
		console.log('Signup throttled');
		return res.status(429).end('throttled');
	}
	canUseAuth = false;
	setTimeout(() => canUseAuth = true, THROTTLE_TIME);
	next();
});

app.all('*', (_req, _res, next) => {
	console.log('RECEIVED INCORRECT REQUEST');
	next();
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});