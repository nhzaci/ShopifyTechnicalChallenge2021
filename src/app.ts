import express, { Application, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../build/routes'
import { errorLogger, requestLogger } from './middleware/logging'

export const app: Application = express()

app.use(express.json())
app.use(requestLogger)

try {
  app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import('../build/swagger.json'))
    )
  })
} catch (e) {
  console.log('Unable to load Swagger docs', e)
}

RegisterRoutes(app)

app.use(errorLogger)
