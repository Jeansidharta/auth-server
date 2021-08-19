// This is a config file for the process manager `pm2`. See this link for more info:
// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
	apps: [{
		name: 'authentication server',
		script: 'build/index.js',
		watch: false,
		time: true,
		env: {
			PORT: 4001
		}
	}],
};
