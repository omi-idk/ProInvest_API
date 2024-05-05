import express from 'express'
import config from './config'
import clienteRoutes from './routes/cliente.routes'
import estadoRoutes from './routes/estado.routes'
import municipiosRouters from './routes/municipio.routes'
import coloniaRouters from './routes/colonia.routes'
import codigoPostalRouters from './routes/codigoPostal.routes'


const app = express()

app.set('port', config.port)


app.use(express.json())
app.use(express.urlencoded({extended: false}));



app.use(clienteRoutes)
app.use(estadoRoutes)
app.use(municipiosRouters)
app.use(coloniaRouters)
app.use(codigoPostalRouters)



export default app