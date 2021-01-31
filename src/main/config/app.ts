import expres from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
const app = expres()
setupMiddlewares(app)
setupRoutes(app)
export default app