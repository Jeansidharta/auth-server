import { Router } from "express";
import { CORRECT_PASSWORD } from '../../keys.json';
import { setTokenAsCookie, signJwt } from "../../lib/jwt";

const router = Router();

router.post('/', (req, res) => {
	const { password } = req.body;

	if (password !== CORRECT_PASSWORD) return res.status(401).end('failed');

	const token = signJwt('root', ['admin']);
	setTokenAsCookie(res, token);

	res.status(201).end('success');
});

export default router;