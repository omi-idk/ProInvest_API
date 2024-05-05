import express from 'express'
import config from './config'


import clienteRoutes from './routes/cliente.routes'

const app = express()

app.set('port', config.port)


app.use(express.json())
app.use(express.urlencoded({extended: false}));



app.use(clienteRoutes)

export default app