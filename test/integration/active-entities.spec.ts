import { test } from '../components'
import { Entities, Error } from '../../src/proto/bff'

test('e2e active entities', function ({ components, spyComponents }) {
  describe('error', () => {
    it('error should be reported in json format', async () => {
      const { localFetch } = components

      const r = await localFetch.fetch('/content/entities/active', { method: 'POST', body: JSON.stringify({}) })

      expect(r.status).toEqual(400)

      const response = await r.json()
      expect(response.error).toEqual('ids or pointers must be present, but not both')
    })

    it('error should be reported in protobuf format', async () => {
      const { localFetch } = components

      const r = await localFetch.fetch('/content/entities/active', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          Accept: 'application/x-protobuf'
        }
      })

      expect(r.status).toEqual(400)

      const buf = await r.arrayBuffer()
      const error = Error.decode(new Uint8Array(buf))
      expect(error.message).toEqual('ids or pointers must be present, but not both')
    })
  })

  describe('sucess - wearables', () => {
    const pointer = 'urn:decentraland:matic:collections-v2:0x768c1027b1f1a452ecb8dab017a1e630a75f0d30:9'

    it('should return a list of entities in json format', async () => {
      const { localFetch } = components

      const r = await localFetch.fetch('/content/entities/active', {
        method: 'POST',
        body: JSON.stringify({ pointers: [pointer] }),
        headers: {
          Accept: 'application/json'
        }
      })

      expect(r.status).toEqual(200)

      const entities = await r.json()
      expect(entities.length).toEqual(1)
    })

    it('should return a list of entities in protobuf format', async () => {
      const { localFetch } = components

      const r = await localFetch.fetch('/content/entities/active', {
        method: 'POST',
        body: JSON.stringify({ pointers: [pointer] }),
        headers: {
          Accept: 'application/x-protobuf'
        }
      })

      expect(r.status).toEqual(200)

      const buf = await r.arrayBuffer()
      const { entities } = Entities.decode(new Uint8Array(buf))
      expect(entities.length).toEqual(1)
    })
  })
})
