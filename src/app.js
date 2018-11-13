import path from 'path'
import fs from 'fs'
import https from 'https'
import passport from 'passport'
import session from 'express-session'
import {
  env,
  mongo,
  port,
  ip,
  apiRoot
} from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

const certOptions = {
  key: fs.readFileSync(path.resolve('certs/key.pem')),
  cert: fs.readFileSync(path.resolve('certs/cert.pem'))
}

const app = express(apiRoot, api)
const server = https.createServer(certOptions, app)

mongoose.connect(mongo.uri, {
  useNewUrlParser: true
})

mongoose.Promise = Promise

app.use(express.json())
app.use(passport.initialize())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
