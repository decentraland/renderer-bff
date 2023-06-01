import { Writer } from 'protobufjs/minimal'
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

// we use a shared writer to reduce allocations and leverage its allocation pool
const writer = new Writer()

export function encode<T>(encoder: (message: T, writer: Writer) => void, message: T): Uint8Array {
  writer.reset()
  encoder(message, writer)
  return writer.finish()
}
