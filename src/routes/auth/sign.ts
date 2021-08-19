import { Router } from "express";
import { signJwt, verifyJwt } from "../../lib/jwt";

const router = Router();

router.post('/', (req, res) => {
	const { auth_key } = req.cookies;
	const { roles } = req.body as { roles: string[] };

	if (!verifyJwt(auth_key)) res.status(403).end();

	if (roles.find(role => role.toLowerCase() === 'admin')) {
		return res.status(400).end(`Cannot use 'admin' role. This is reserved for Sidharta!`);
	}

	const token = signJwt('root', roles);
	res.setHeader('Content-Type', 'application/json');
	res.status(200).end(JSON.stringify({ token }));
});

export default router;