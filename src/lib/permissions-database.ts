import path from 'path';
import fs from 'fs/promises';

const filePath = path.join(require.main!.path, '../database.json');

export type PermissionEntry = {
	domain: string;
	roles: string[];
}

export type PermisisonsDatabase = {
	[domainName: string]: PermissionEntry
};

let database: PermisisonsDatabase | null = null;

async function readPermissionsDatabase () {
	if (!database) {
		database = JSON.parse(await fs.readFile(filePath, { encoding: 'utf-8' })) as PermisisonsDatabase;
	}
	return database;
}

async function writePermissionsDatabase () {
	return await fs.writeFile(filePath, JSON.stringify(database), { encoding: 'utf-8' });
}

export async function addOrReplacePermissionEntry (entry: PermissionEntry) {
	if (!database) database = await readPermissionsDatabase();
	database[entry.domain] = entry;

	writePermissionsDatabase();
}

export async function removePermissionEntry (domain: string) {
	if (!database) database = await readPermissionsDatabase();
	delete database[domain];

	writePermissionsDatabase();
}

export async function getPermissionEntry (domain: string) {
	if (!database) database = await readPermissionsDatabase();
	return database[domain];
}

export async function listPermissionEntries () {
	if (!database) database = await readPermissionsDatabase();
	return Object.values(database);
}