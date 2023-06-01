import { AppComponents } from '../types'
import { ContentClient, createContentClient } from 'dcl-catalyst-client'

const DEFAULT_CONTENT_URL = 'https://peer.decentraland.org/content'

let defaultClient: ContentClient | undefined
export function getContentClient({ fetch }: Pick<AppComponents, 'fetch'>, url: string | undefined): ContentClient {
  if (!url) {
    if (!defaultClient) {
      defaultClient = createContentClient({ url: DEFAULT_CONTENT_URL, fetcher: fetch })
    }
    return defaultClient
  }
  return createContentClient({ url, fetcher: fetch })
}
