import { Router } from '@well-known-components/http-server'
import { GlobalContext } from '../types'
import { pingHandler } from './handlers/ping-handler'
import { activeEntitiesHandler } from './handlers/active-entities-handler'
import { errorHandler } from './handlers/error-handler'

// We return the entire router because it will be easier to test than a whole server
export async function setupRouter(_globalContext: GlobalContext): Promise<Router<GlobalContext>> {
  const router = new Router<GlobalContext>()
  router.use(errorHandler)

  router.get('/ping', pingHandler)
  router.post('/content/entities/active', activeEntitiesHandler)

  return router
}
