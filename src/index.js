import app from "./app"

import './dbConfig/connection'

app.listen(app.get('port'))

console.log('server on port: ', app.get('port'))