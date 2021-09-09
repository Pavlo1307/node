module.exports = {
    PORT: process.env.PORT || 5000,
    dataBasePost: process.env.dataBasePost || 'mongodb://localhost:27017/first',
    CURRENT_YEAR: new Date().getFullYear(),

    ACCESS_SECRET_KEY: 'Secret',
    REFRESH_SECRET_KEY: 'SecretWord2',
    FORGOT_PASSWORD_SECRET_KEY: 'secretForgot',
    FrontendURL: 'https://google.com',

    noReplyEmail: process.env.noReplyEmail || 'pavloshavel@gmail.com',
    noReplyPassword: process.env.noReplyPassword || '00000'

};
