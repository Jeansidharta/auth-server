import { Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from '../keys.json';

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // one month

export type TokenContent = {
	user: string;
	roles: string[];
};

export function setTokenAsCookie (res: Response, token: string) {
	res.cookie('auth_key', token, {
		httpOnly: true,
		domain: 'sidharta.xyz',
		sameSite: 'lax',
		secure: true,
		maxAge: TOKEN_EXPIRATION_TIME,
	});
}

export function verifyJwt (key: string) {
	try {
		return jsonwebtoken.verify(key, SECRET) as TokenContent;
	} catch (e) {
		return null;
	}
}

export function signJwt (user: string, roles: string[]) {
	return jsonwebtoken.sign(
		{ user, roles },
		SECRET,
		{expiresIn: TOKEN_EXPIRATION_TIME / 1000},
	);
}