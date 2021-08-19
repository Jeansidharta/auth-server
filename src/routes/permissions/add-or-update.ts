import { Router } from "express";
import { verifyJwt } from "../../lib/jwt";
import { addOrReplacePermissionEntry } from "../../lib/permissions-database";

const router = Router();

router.post('/', async (req, res) => {
	const { auth_key } = req.cookies;

	const tokenContent = verifyJwt(auth_key);

	if (!tokenContent) return res.status(403).end();

	if (!tokenContent.roles.find(role => role.toLowerCase() === 'admin')) {
		return res.status(403).end();
	}

	if (!req.body) {
		return res.status(400).end('Requires a body');
	}

	const body = req.body as { domain: string, roles: string[] };
	if (!body.domain) {
		return res.status(400).end('A domain is required');
	}

	if (!body.domain.endsWith('sidharta.xyz')) {
		return res.status(400).end('The domain must end with sidharta.xyz');
	}

	if (!body.roles || !Array.isArray(body.roles)) {
		return res.status(400).end('A Role is required');
	}

	await addOrReplacePermissionEntry(req.body);

	return res.status(201).end();
});

export default router;