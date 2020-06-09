import { ReadStream } from 'fs';

export class UploadDocCommand {
    constructor(
        public readonly actId: string,
        public readonly file: ReadStream,
        public readonly docId: string,
    ) {}
}