import { getContentClient } from '../../logic/utils'
import { HandlerContextWithPath, InvalidRequestError } from '../../types'

export async function activeEntitiesHandler(context: HandlerContextWithPath<'fetch', '/content/active/entities'>) {
  const {
    components: { fetch }
  } = context

  const body = await context.request.json()
  const ids: string[] = body.ids
  const pointers: string[] = body.pointers

  const idsPresent = ids?.length > 0
  const pointersPresent = pointers?.length > 0

  const bothPresent = idsPresent && pointersPresent
  const nonePresent = !idsPresent && !pointersPresent
  if (bothPresent || nonePresent) {
    throw new InvalidRequestError('ids or pointers must be present, but not both')
  }

  const client = getContentClient({ fetch }, body.contentUrl)

  const entities = await (idsPresent ? client.fetchEntitiesByIds(ids) : client.fetchEntitiesByPointers(pointers))

  return {
    body: entities
  }
}
