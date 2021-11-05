import sql from 'mssql'
import config from '../config'

const sqlConfig = {
    user: config.dbUSER,
    password: config.dbPWD,
    database: config.dbNAME,
    server: config.dbSERVER,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const Connection = async () => {
    try {
        const pool = await sql.connect(sqlConfig)
        return pool
    } catch (error) {
        console.log(`ERROR PART ON ${error}`)
    }
}

export { sql, sqlConfig }