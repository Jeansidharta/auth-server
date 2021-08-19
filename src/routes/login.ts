import { Router } from "express";
import { setTokenAsCookie, verifyJwt } from "../lib/jwt";

const router = Router();

router.get('/', (req, res) => {
	const { token, redirect } = req.query;

	if (!token) {
		return res.status(400).end('Token is missing. This URL is probably broken.');
	}

	if (typeof token !== 'string') {
		return res.status(400).end('Token must be a string. This URL is probably broken.');
	}

	if (!redirect) {
		return res.status(400).end('URL is missing. This URL is probably broken.');
	}

	if (typeof redirect !== 'string') {
		return res.status(400).end('URL must be a string. This URL is probably broken.');
	}

	if (!verifyJwt(token)) return res.status(403).end('Invalid Token');
	setTokenAsCookie(res, token);

	res.setHeader('Location', redirect);
	res.status(301).send();
});

export default router;