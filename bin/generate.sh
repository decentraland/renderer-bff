 npx @openapitools/openapi-generator-cli generate -i node_modules/@dcl/catalyst-api-specs/lib/api.yaml -g protobuf-schema -o proto
protoc --plugin=./node_modules/.bin/protoc-gen-dcl_ts_proto --ts_proto_out=. -I=./proto/models ./proto/models/entity.proto
