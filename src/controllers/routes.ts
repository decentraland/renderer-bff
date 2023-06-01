import { Router } from '@well-known-components/http-server'
import { ACCEPT_JSON, ACCEPT_PROTOBUF, GlobalContext, HandlerContextWithPath } from '../types'
import { pingHandler } from './handlers/ping-handler'
import { activeEntitiesHandler } from './handlers/active-entities-handler'
import { errorHandler } from './handlers/error-handler'
import { IHttpServerComponent } from '@well-known-components/interfaces'
import * as Accept from '@hapi/accept'

export async function mediaHandler(
  ctx: IHttpServerComponent.DefaultContext<{ mediaType: string }>,
  next: () => Promise<IHttpServerComponent.IResponse>
): Promise<IHttpServerComponent.IResponse> {
  ctx.mediaType = Accept.mediaType(ctx.request.headers.get('Accept') || undefined, [ACCEPT_JSON, ACCEPT_PROTOBUF])
  return next()
}

// We return the entire router because it will be easier to test than a whole server
export async function setupRouter(_globalContext: GlobalContext): Promise<Router<GlobalContext>> {
  const router = new Router<GlobalContext>()
  router.use(mediaHandler)
  router.use(errorHandler)

  router.get('/ping', pingHandler)
  router.post('/content/entities/active', activeEntitiesHandler)

  return router
}
