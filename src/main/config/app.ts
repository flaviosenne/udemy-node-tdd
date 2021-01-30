import expres from 'express'
import setupMiddlewares from './middlewares'

const app = expres()
setupMiddlewares(app)
export default app