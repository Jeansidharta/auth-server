import { Router } from "express";
import { verifyJwt } from "../../lib/jwt";
import { getPermissionEntry } from "../../lib/permissions-database";

const router = Router();

router.get('/', async (req, res) => {
	const { auth_key } = req.cookies;

	const tokenContent = verifyJwt(auth_key);

	if (!tokenContent) return res.status(403).end();

	const tokenRoles = tokenContent.roles;

	if (tokenRoles.find(role => role.toLowerCase() === 'admin')) {
		return res.status(201).end();
	}

	const targetHost = req.header('x-original-host');

	if (!targetHost) throw new Error('Target host must be provided by header X-Original-Host');

	const permissionEntry = await getPermissionEntry(targetHost);

	if (!permissionEntry) return res.status(403).end();

	console.log(targetHost, tokenRoles, permissionEntry);

	if (!tokenRoles.find(tokenRole => permissionEntry.roles.find(permissionRole => tokenRole.toLowerCase() === permissionRole.toLowerCase()))) 	{
		return res.status(403).end();
	}

	return res.status(201).end();
});

export default router;