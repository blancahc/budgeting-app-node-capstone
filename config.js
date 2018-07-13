exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin123@ds235411.mlab.com:35411/budgeting-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:admin123@ds235411.mlab.com:35411/budgeting-app';
exports.PORT = process.env.PORT || 8080;
