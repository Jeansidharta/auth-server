import { Router } from "express";
import { verifyJwt } from "../../lib/jwt";
import { listPermissionEntries } from "../../lib/permissions-database";

const router = Router();

router.get('/', async (req, res) => {
	const { auth_key } = req.cookies;

	const tokenContent = verifyJwt(auth_key);

	if (!tokenContent) return res.status(403).end();

	if (!tokenContent.roles.find(role => role.toLowerCase() === 'admin')) {
		return res.status(403).end();
	}

	return res.status(200).send({ permissions: await listPermissionEntries() });
});

export default router;