import { IHttpServerComponent } from '@well-known-components/interfaces'
import { ACCEPT_JSON, InvalidRequestError, NotFoundError } from '../../types'
import { encode } from '../../logic/utils'
import { Error } from '../../proto/bff'

function handleError(error: any, mediaType: string) {
  if (error instanceof InvalidRequestError) {
    const body = mediaType === ACCEPT_JSON ? { error: error.message } : encode(Error.encode, error)

    return {
      status: 400,
      body
    }
  }

  if (error instanceof NotFoundError) {
    const body = mediaType === ACCEPT_JSON ? { error: error.message } : encode(Error.encode, error)
    return {
      status: 404,
      body
    }
  }

  const body = mediaType === ACCEPT_JSON ? { error: error.message } : encode(Error.encode, error)
  return {
    status: 500,
    body
  }
}

export async function errorHandler(
  ctx: IHttpServerComponent.DefaultContext<{ mediaType: string }>,
  next: () => Promise<IHttpServerComponent.IResponse>
): Promise<IHttpServerComponent.IResponse> {
  try {
    return await next()
  } catch (error: any) {
    return handleError(error, ctx.mediaType)
  }
}
