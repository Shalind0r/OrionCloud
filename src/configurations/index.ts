import * as process from 'process';

export default () => ({
	port: process.env.PORT,
	database: process.env.DATABASE,
	accessKey: process.env.ACCESS_KEY,
	expireAccessKey: process.env.EXPIRE_ACCESS_KEY,
	refreshKey: process.env.REFRESH_KEY,
	expireRefreshKey: process.env.EXPIRE_REFRESH_KEY,
});
