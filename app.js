import routes from './routes/account.routes'
import config from './config'
import express from 'express'
import cors from 'cors'

const app = express()

app.set('port', config.PORT || 8008)
app.set('trust proxy', 1)


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(routes)


export default app