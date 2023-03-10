module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/productWebSiteBD',
    PORT: process.env.PORT || 5000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'default_access',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'default_refresh'
};
