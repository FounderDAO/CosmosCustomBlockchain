/* eslint-disable */
import { Params } from "../lone/params";
import { Whois } from "../lone/whois";
import { Customtx } from "../lone/customtx";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "darxan.lone.lone";

/** GenesisState defines the lone module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  whoisList: Whois[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  customtxList: Customtx[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.whoisList) {
      Whois.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.customtxList) {
      Customtx.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.whoisList = [];
    message.customtxList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.whoisList.push(Whois.decode(reader, reader.uint32()));
          break;
        case 4:
          message.customtxList.push(Customtx.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.whoisList = [];
    message.customtxList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromJSON(e));
      }
    }
    if (object.customtxList !== undefined && object.customtxList !== null) {
      for (const e of object.customtxList) {
        message.customtxList.push(Customtx.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.whoisList) {
      obj.whoisList = message.whoisList.map((e) =>
        e ? Whois.toJSON(e) : undefined
      );
    } else {
      obj.whoisList = [];
    }
    if (message.customtxList) {
      obj.customtxList = message.customtxList.map((e) =>
        e ? Customtx.toJSON(e) : undefined
      );
    } else {
      obj.customtxList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.whoisList = [];
    message.customtxList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.whoisList !== undefined && object.whoisList !== null) {
      for (const e of object.whoisList) {
        message.whoisList.push(Whois.fromPartial(e));
      }
    }
    if (object.customtxList !== undefined && object.customtxList !== null) {
      for (const e of object.customtxList) {
        message.customtxList.push(Customtx.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
