import { ErrorRequestHandler, RequestHandler } from 'express'
import { Logger } from '../utils/logger'

const requestLogger: RequestHandler = (req, _, next) => {
  Logger.info(`Incoming request to ${req.url} with`, req.body, req.params)
  next()
}

const errorLogger: ErrorRequestHandler = (err, _, __, next) => {
  Logger.error(`Request ended with error ${err.message}`, err)
  next()
}

export { requestLogger, errorLogger }
