module.exports = {
    PORT: process.env.PORT || 5000,
    dataBasePost: process.env.dataBasePost || 'mongodb://localhost:27017/first',
    CURRENT_YEAR: new Date().getFullYear()
};
