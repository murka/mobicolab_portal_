// package: api_gateway_service
// file: api-gateway.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class SavingData extends jspb.Message {
  getActid(): string;
  setActid(value: string): void;

  getDocid(): string;
  setDocid(value: string): void;

  getDoc(): Uint8Array | string;
  getDoc_asU8(): Uint8Array;
  getDoc_asB64(): string;
  setDoc(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SavingData.AsObject;
  static toObject(includeInstance: boolean, msg: SavingData): SavingData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SavingData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SavingData;
  static deserializeBinaryFromReader(message: SavingData, reader: jspb.BinaryReader): SavingData;
}

export namespace SavingData {
  export type AsObject = {
    actid: string,
    docid: string,
    doc: Uint8Array | string,
  }
}

export class docId extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): docId.AsObject;
  static toObject(includeInstance: boolean, msg: docId): docId.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: docId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): docId;
  static deserializeBinaryFromReader(message: docId, reader: jspb.BinaryReader): docId;
}

export namespace docId {
  export type AsObject = {
    id: string,
  }
}

export class File extends jspb.Message {
  getDoc(): Uint8Array | string;
  getDoc_asU8(): Uint8Array;
  getDoc_asB64(): string;
  setDoc(value: Uint8Array | string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): File.AsObject;
  static toObject(includeInstance: boolean, msg: File): File.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): File;
  static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
  export type AsObject = {
    doc: Uint8Array | string,
    name: string,
  }
}

