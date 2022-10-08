const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
// work with express
const server = require('http').Server(app)


const userRouter = require('./user')
const shipRouter = require('./ship')
const MaterialsRouter = require('./materials')
const LocationsRouter = require('./locations')
const WorkRouter = require('./work')
const NewRouter = require('./new')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/user',userRouter)
app.use('/api/ship',shipRouter)
app.use('/api/materials',MaterialsRouter)
app.use('/api/locations',LocationsRouter)
app.use('/api/work',WorkRouter)
app.use('/api/new',NewRouter)

server.listen(8083,function(){
	// console.log('Node app start at port 8083')
})