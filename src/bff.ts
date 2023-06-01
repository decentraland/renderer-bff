/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface EntityContent {
  file: string;
  hash: string;
}

export interface Entity {
  version: string;
  id: string;
  type: string;
  timestamp: number;
  pointers: string[];
  content: EntityContent[];
}

export interface Entities {
  entities: Entity[];
}

export interface Error {
  message: string;
}

function createBaseEntityContent(): EntityContent {
  return { file: "", hash: "" };
}

export const EntityContent = {
  encode(message: EntityContent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.file !== "") {
      writer.uint32(10).string(message.file);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityContent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.file = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntityContent {
    return { file: isSet(object.file) ? String(object.file) : "", hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: EntityContent): unknown {
    const obj: any = {};
    message.file !== undefined && (obj.file = message.file);
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  create<I extends Exact<DeepPartial<EntityContent>, I>>(base?: I): EntityContent {
    return EntityContent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EntityContent>, I>>(object: I): EntityContent {
    const message = createBaseEntityContent();
    message.file = object.file ?? "";
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseEntity(): Entity {
  return { version: "", id: "", type: "", timestamp: 0, pointers: [], content: [] };
}

export const Entity = {
  encode(message: Entity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.timestamp !== 0) {
      writer.uint32(37).float(message.timestamp);
    }
    for (const v of message.pointers) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.content) {
      EntityContent.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.type = reader.string();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.timestamp = reader.float();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.pointers.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.content.push(EntityContent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Entity {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      id: isSet(object.id) ? String(object.id) : "",
      type: isSet(object.type) ? String(object.type) : "",
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      pointers: Array.isArray(object?.pointers) ? object.pointers.map((e: any) => String(e)) : [],
      content: Array.isArray(object?.content) ? object.content.map((e: any) => EntityContent.fromJSON(e)) : [],
    };
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = message.type);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    if (message.pointers) {
      obj.pointers = message.pointers.map((e) => e);
    } else {
      obj.pointers = [];
    }
    if (message.content) {
      obj.content = message.content.map((e) => e ? EntityContent.toJSON(e) : undefined);
    } else {
      obj.content = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Entity>, I>>(base?: I): Entity {
    return Entity.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = createBaseEntity();
    message.version = object.version ?? "";
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    message.timestamp = object.timestamp ?? 0;
    message.pointers = object.pointers?.map((e) => e) || [];
    message.content = object.content?.map((e) => EntityContent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEntities(): Entities {
  return { entities: [] };
}

export const Entities = {
  encode(message: Entities, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entities) {
      Entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entities {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntities();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entities.push(Entity.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Entities {
    return { entities: Array.isArray(object?.entities) ? object.entities.map((e: any) => Entity.fromJSON(e)) : [] };
  },

  toJSON(message: Entities): unknown {
    const obj: any = {};
    if (message.entities) {
      obj.entities = message.entities.map((e) => e ? Entity.toJSON(e) : undefined);
    } else {
      obj.entities = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Entities>, I>>(base?: I): Entities {
    return Entities.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Entities>, I>>(object: I): Entities {
    const message = createBaseEntities();
    message.entities = object.entities?.map((e) => Entity.fromPartial(e)) || [];
    return message;
  },
};

function createBaseError(): Error {
  return { message: "" };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Error {
    return { message: isSet(object.message) ? String(object.message) : "" };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<Error>, I>>(base?: I): Error {
    return Error.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.message = object.message ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
