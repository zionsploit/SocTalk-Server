import { Connection, sql } from "../databases/connection"
import procedure from "../databases/procedure"
import { createAccountToken, loginCreateToken } from "../token/token"
import { format } from 'date-fns'


export const getUserDataController = async (req, res) => {
    try {
        const usertoken = req.users.username;
        const pool = await Connection()
        const result = await pool.request()
            .input('username', sql.VarChar(50), usertoken)
            .query(`SELECT * FROM accounttb WHERE username = @username`)

        if (result) {
            res.json(result.recordset)
        }
        else {
            res.json('no data')
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export const addAccountController = async (req, res, next) => {
    try {
        const { email, pass } = req.body
        const isActive = true
        const dateNow = format(new Date(), 'MMM-dd-yyyy')

        const pool = await Connection()
        await pool.request()
            .input('email', sql.VarChar(50), email)
            .input('pass', sql.VarChar(50), pass)
            .input('isActive', sql.Char(10), isActive)
            .input('dateCreated', sql.VarChar(50), dateNow)
            .execute(procedure.addAccountProcedure, (err, result) => {
                if (err) {
                    res.json(`Error: ${err}`)
                }
                else {
                    res.json({ tokenAccess: createAccountToken({ email: email }), status: "ok" })
                }
            })

    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { email, pass } = req.body
        try {
            const pool = await Connection()

            await pool.request()
                .input('email', sql.VarChar(50), email)
                .input('pass', sql.VarChar(50), pass)
                .execute(procedure.loginProcedure, (error, result) => {
                    if (result.returnValue === 1 ?? error) {
                        res.json({ tokenAccess: loginCreateToken({ email: email }) })
                    }
                    else {
                        res.json(`Login Failed`)
                    }

                })
        } catch (error) {
            console.log(`ERROR[2]: ${error}`)
        }
    } catch (error) {
        next(error)
    }
}

export const getDataByUsernameController = async (req, res) => {
    try {
        const username = req.users.username
        const pool = await Connection()
        const result = await pool.request()
            .input('username', sql.VarChar(50), username)
            .query('SELECT * from accounttb where username = @username');

        res.json(result.recordsets)
    } catch (error) {
        console.log(`[GetDataByUsernameController]:[error]: ${error}`)
    }
}

export const createAccountInfoController = async (req, res) => {
    try {
        const { firstName, lastName } = req.body

        const pool = await Connection()
        await pool.request()
            .input('firstName', sql.VarChar(50), firstName)
            .input('lastName', sql.VarChar(50), lastName)
            .execute(procedure.createAccountInfoProcedure, (err, result) => {
                if (result.rowsAffected == 1 ?? err) {
                    res.send({ status: 200, msg: 'ok' })
                }
                else {
                    res.send({ status: 401, msg: 'Error' })
                }
            })

    } catch (error) {
        console.log(`[GetAccountInfoController]:[error]: ${error}`)
    }
}