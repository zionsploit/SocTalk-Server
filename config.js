require('dotenv/config')

export default {
    //HTTP
    PORT: process.env.PORT,
    //DB
    dbUSER: process.env.DB_USER,
    dbPWD: process.env.DB_PWD,
    dbNAME: process.env.DB_NAME,
    dbSERVER: process.env.DB_SERVER,
    //SESSION
    loginSecKey: process.env.LOGIN_SEC_SESSION,
    createAccSecKey: process.env.CREATE_ACC_SEC_SESSION
}